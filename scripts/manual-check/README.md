# Manual checks against staging

Each TypeScript migration batch has a script here that calls every method in that batch against a real Smartsheet environment. You run it twice, once with the baseline SDK and once with the PR build, then diff the two outputs. Any difference is raised in the PR as a quirk for review.

The scripts are plain CommonJS on purpose, so the same script can `require()` either build by path.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `SMARTSHEET_ACCESS_TOKEN` | yes | Main staging token used for every call except revoke |
| `SMARTSHEET_API_HOST` | yes | Staging API base URL, **with trailing slash**, e.g. `https://<staging-host>/2.0/` |
| `SMARTSHEET_REVOKE_TEST_TOKEN` | no | Spare token that `tokens.revokeAccessToken` revokes (runs last). Use a **different spare token for each run** |
| `SMARTSHEET_OAUTH_CLIENT_ID`, `SMARTSHEET_OAUTH_APP_SECRET` | no | OAuth app credentials for `getAccessToken` / `refreshAccessToken` |
| `SMARTSHEET_OAUTH_CODE` | no | Authorization code for `getAccessToken`. Single use: each run needs a fresh one |
| `SMARTSHEET_OAUTH_REFRESH_TOKEN` | no | Refresh token for `refreshAccessToken`. Single use: each run needs a fresh one |

Steps whose optional variables are missing are printed as `skipped`. Tokens minted by `getAccessToken` / `refreshAccessToken` are revoked by the script before it finishes. The script refuses to run if the spare revoke token equals the main token. Credentials are only read from the environment; never commit them.

## Procedure (batch 1)

```bash
# 1. Build the baseline (mainline) SDK in a separate worktree
git worktree add ../sdk-baseline mainline
(cd ../sdk-baseline && npm ci && npm run build)

# 2. Build the PR branch
npm run build

# 3. Run against both (fresh spare revoke token for each run)
SMARTSHEET_REVOKE_TEST_TOKEN=<spare-1> node scripts/manual-check/batch1.cjs ../sdk-baseline/dist/index.js > before.jsonl
SMARTSHEET_REVOKE_TEST_TOKEN=<spare-2> node scripts/manual-check/batch1.cjs ./dist/index.js > after.jsonl

# 4. Compare
diff before.jsonl after.jsonl && echo "No behavior difference"

# 5. Clean up the baseline worktree when done
git worktree remove ../sdk-baseline
```

## Reading the output

- One JSON line per step: `step`, `ok`, and either `result` or `error` (`statusCode`, `errorCode`, `message`), plus any `warnings` the SDK logged.
- IDs, permalinks, tokens, `refId`, timestamps, and the run's unique resource name are replaced with placeholders, so two runs are directly comparable.
- The script creates a throwaway workspace (with a sheet and an attachment) and deletes it at the end, even if a step fails.
- Output includes the staging user's name and email (e.g. from `users/me`); trim those before pasting output into a PR.
- The `home` endpoints are deprecated and may return errors on staging. Identical errors on both runs count as a pass.
