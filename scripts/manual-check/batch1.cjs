// Manual check for TS migration batch 1 (server, home, request, tokens).
//
// Calls every batch-1 method against a real Smartsheet environment using the
// SDK build at the path given as the first argument, and prints one
// normalized JSON line per step so two runs (baseline vs. PR build) can be
// diffed. See README.md in this folder for the full procedure.
//
// Usage: node scripts/manual-check/batch1.cjs <path-to-sdk-dist-index.js>
const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');

const sdkPath = process.argv[2];
const { SMARTSHEET_ACCESS_TOKEN, SMARTSHEET_API_HOST } = process.env;

if (!sdkPath || !SMARTSHEET_ACCESS_TOKEN || !SMARTSHEET_API_HOST) {
  console.error(
    'Usage: SMARTSHEET_ACCESS_TOKEN=... SMARTSHEET_API_HOST=https://<staging-host>/2.0/ ' +
      'node scripts/manual-check/batch1.cjs <path-to-sdk-dist-index.js>'
  );
  process.exit(2);
}

if (process.env.SMARTSHEET_REVOKE_TEST_TOKEN && process.env.SMARTSHEET_REVOKE_TEST_TOKEN === SMARTSHEET_ACCESS_TOKEN) {
  console.error('SMARTSHEET_REVOKE_TEST_TOKEN must be a spare token, not the same as SMARTSHEET_ACCESS_TOKEN.');
  process.exit(2);
}

const smartsheet = require(path.resolve(sdkPath));
const client = smartsheet.createClient({ accessToken: SMARTSHEET_ACCESS_TOKEN });

const runTag = `sdk-manual-check-${Date.now()}`;
const VOLATILE_KEYS = new Set(['id', 'permalink', 'refId', 'access_token', 'refresh_token', 'createdAt', 'modifiedAt']);
const ISO_DATE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;

function normalize(value, key) {
  if (key && (VOLATILE_KEYS.has(key) || /Id$/.test(key))) return `<${key}>`;
  if (Array.isArray(value)) return value.map((v) => normalize(v));
  if (value && typeof value === 'object') {
    const out = {};
    for (const k of Object.keys(value).sort()) out[k] = normalize(value[k], k);
    return out;
  }
  if (typeof value === 'string') {
    if (ISO_DATE.test(value)) return '<date>';
    return value.split(runTag).join('<tag>');
  }
  return value;
}

function print(line) {
  console.log(JSON.stringify(normalize(line)));
}

async function step(name, fn) {
  const warnings = [];
  const originalWarn = console.warn;
  console.warn = (...args) => warnings.push(args.join(' '));
  try {
    const result = await fn();
    print({ step: name, ok: true, result, ...(warnings.length ? { warnings } : {}) });
    return result;
  } catch (error) {
    const e = error || {};
    print({
      step: name,
      ok: false,
      error: { statusCode: e.statusCode, errorCode: e.errorCode, message: e.message },
      ...(warnings.length ? { warnings } : {}),
    });
    return undefined;
  } finally {
    console.warn = originalWarn;
  }
}

function skip(name, reason) {
  print({ step: name, skipped: reason });
}

const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');

async function main() {
  // server
  await step('server.getInfo', () => client.server.getInfo());

  // home (deprecated; identical errors on both runs count as a pass)
  await step('home.listContents', () => client.home.listContents());
  await step('home.listFolders', () => client.home.listFolders());
  const homeFolder = await step('home.createFolder', () => client.home.createFolder({ body: { name: runTag } }));
  if (homeFolder && homeFolder.result && homeFolder.result.id) {
    await step('cleanup: folders.deleteFolder', () => client.folders.deleteFolder({ folderId: homeFolder.result.id }));
  }

  // request (generic passthrough)
  const workspace = await step('request.post workspaces', () =>
    client.request.post({ url: 'workspaces', body: { name: runTag } })
  );
  const workspaceId = workspace && workspace.result && workspace.result.id;
  try {
    await step('request.get users/me', () => client.request.get({ url: 'users/me' }));
    if (!workspaceId) {
      skip('request.post/put/postFile', 'workspace creation failed');
    } else {
      const sheet = await step('request.post workspaces/{id}/sheets', () =>
        client.request.post({
          url: `workspaces/${workspaceId}/sheets`,
          body: { name: runTag, columns: [{ title: 'A', primary: true, type: 'TEXT_NUMBER' }] },
        })
      );
      const sheetId = sheet && sheet.result && sheet.result.id;
      if (!sheetId) {
        skip('request.put/postFile', 'sheet creation failed');
      } else {
        await step('request.put sheets/{id}', () =>
          client.request.put({ url: `sheets/${sheetId}`, body: { name: `${runTag}-renamed` } })
        );
        const tmpFile = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'sdk-check-')), 'check.txt');
        fs.writeFileSync(tmpFile, 'manual check attachment\n');
        await step('request.postFile sheets/{id}/attachments', () =>
          client.request.postFile({
            url: `sheets/${sheetId}/attachments`,
            path: tmpFile,
            fileName: 'check.txt',
            contentType: 'text/plain',
          })
        );
      }
    }
  } finally {
    if (workspaceId) {
      await step('request.delete workspaces/{id}', () => client.request.delete({ url: `workspaces/${workspaceId}` }));
    }
  }

  // tokens
  const { SMARTSHEET_OAUTH_CLIENT_ID: clientId, SMARTSHEET_OAUTH_APP_SECRET: secret } = process.env;
  const { SMARTSHEET_OAUTH_CODE: code, SMARTSHEET_OAUTH_REFRESH_TOKEN: refreshToken } = process.env;

  // Tokens minted by this run; revoked below so none are left alive.
  const minted = [];

  if (clientId && secret && code) {
    const token = await step('tokens.getAccessToken', () =>
      client.tokens.getAccessToken({
        queryParameters: { client_id: clientId, code, hash: sha256(`${secret}|${code}`) },
      })
    );
    if (token && token.access_token) minted.push(token.access_token);
  } else {
    skip('tokens.getAccessToken', 'no OAuth env vars');
  }

  if (clientId && secret && refreshToken) {
    const token = await step('tokens.refreshAccessToken', () =>
      client.tokens.refreshAccessToken({
        queryParameters: {
          client_id: clientId,
          refresh_token: refreshToken,
          hash: sha256(`${secret}|${refreshToken}`),
        },
      })
    );
    if (token && token.access_token) minted.push(token.access_token);
  } else {
    skip('tokens.refreshAccessToken', 'no OAuth env vars');
  }

  for (const accessToken of minted) {
    await step('cleanup: tokens.revokeAccessToken (minted)', () => client.tokens.revokeAccessToken({ accessToken }));
  }

  // Always last: revokes the spare token, never the main one.
  if (process.env.SMARTSHEET_REVOKE_TEST_TOKEN) {
    await step('tokens.revokeAccessToken', () =>
      client.tokens.revokeAccessToken({ accessToken: process.env.SMARTSHEET_REVOKE_TEST_TOKEN })
    );
  } else {
    skip('tokens.revokeAccessToken', 'SMARTSHEET_REVOKE_TEST_TOKEN not set');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
