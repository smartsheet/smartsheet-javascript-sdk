import { expect, jest, describe, it } from '@jest/globals';
import type { CreateFolderBody } from '../../../lib/folders/types';
import { create as createHome } from '../../../lib/home/index';
import { create as createServer } from '../../../lib/server/index';
import type { FormatTables, ServerInfo } from '../../../lib/server/types';
import type { RevokeAccessTokenResponse, Token } from '../../../lib/tokens/types';
import { create as createTokens } from '../../../lib/tokens/index';
import { create as createRequest } from '../../../lib/request/index';
import { makeFakeRequestor, makeOptions } from './fakeRequestor';

// Valid API calls that the public types must accept (type-checked by ts-jest and tsc).
describe('batch 1 public types accept valid calls', () => {
  it('getAccessToken accepts client_secret instead of hash, and contentType', () => {
    const fake = makeFakeRequestor();
    const api = createTokens(makeOptions(fake.requestor));
    api.getAccessToken({
      queryParameters: { client_id: 'c', code: 'k', client_secret: 's' },
      contentType: 'application/x-www-form-urlencoded',
    });
    expect((fake.requestor.post.mock.calls[0][0] as any).contentType).toBe('application/x-www-form-urlencoded');
  });

  it('refreshAccessToken accepts client_secret instead of hash, and contentType', () => {
    const fake = makeFakeRequestor();
    const api = createTokens(makeOptions(fake.requestor));
    api.refreshAccessToken({
      queryParameters: { client_id: 'c', refresh_token: 'r', client_secret: 's' },
      contentType: 'application/x-www-form-urlencoded',
    });
    expect((fake.requestor.post.mock.calls[0][0] as any).queryParameters.client_secret).toBe('s');
  });

  it('request methods accept interface-typed query parameters', () => {
    interface QP {
      include: string;
    }
    const qp: QP = { include: 'ownerInfo' };
    const fake = makeFakeRequestor();
    const api = createRequest(makeOptions(fake.requestor));
    api.get({ url: 'sheets', queryParameters: qp });
    expect((fake.requestor.get.mock.calls[0][0] as any).queryParameters).toEqual(qp);
  });
});

// Review fixes for PR #218: shapes that must or must not compile.
describe('batch 1 public types match the API', () => {
  const homeApi = createHome(makeOptions(makeFakeRequestor().requestor));
  const tokensApi = createTokens(makeOptions(makeFakeRequestor().requestor));
  const requestApi = createRequest(makeOptions(makeFakeRequestor().requestor));
  const serverApi = createServer(makeOptions(makeFakeRequestor().requestor));
  jest.spyOn(console, 'warn').mockImplementation(() => {});

  it('home.createFolder requires a body with a name', () => {
    // @ts-expect-error body is required
    homeApi.createFolder({});
    // @ts-expect-error name is required
    homeApi.createFolder({ body: {} });
    const body: CreateFolderBody & { name: string } = { name: 'F' };
    homeApi.createFolder({ body });
  });

  it('home.listContents accepts query parameters and a result type', async () => {
    const contents = await homeApi.listContents<{ sheets: unknown[] }>({ queryParameters: { include: 'source' } });
    expect(contents).toBeDefined();
  });

  it('token exchange and refresh require query parameters', () => {
    // @ts-expect-error queryParameters is required
    tokensApi.getAccessToken({});
    // @ts-expect-error queryParameters is required
    tokensApi.refreshAccessToken({});
    tokensApi.revokeAccessToken({});
  });

  it('token and revoke response fields follow the spec', () => {
    const token: Token = {};
    const revoked: RevokeAccessTokenResponse = { message: 'SUCCESS', resultCode: 0, version: null, failedItems: [] };
    expect([token, revoked]).toHaveLength(2);
  });

  it('server info matches the real API response', () => {
    const info: ServerInfo = { featureInfo: { symbolsVersion: 2 }, formats: { color: ['#000000'] } };
    // @ts-expect-error colorForeground is in the spec but not returned by the API
    const wrong: FormatTables = { colorForeground: [] };
    expect([info, wrong]).toHaveLength(2);
  });

  it('server.getInfo result fields are optional', async () => {
    const info = await serverApi.getInfo();
    const locales: string[] | undefined = info?.supportedLocales;
    expect(locales === undefined || Array.isArray(locales)).toBe(true);
  });

  it('request methods type the result first, then the body', () => {
    interface Body {
      name: string;
    }
    requestApi.post<{ id: number }, Body>({ url: 'workspaces', body: { name: 'W' } });
    // @ts-expect-error body must match the declared body type
    requestApi.post<{ id: number }, Body>({ url: 'workspaces', body: { title: 'W' } });
  });
});
