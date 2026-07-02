# Release Procedure

This document is the single source of truth for releasing the Smartsheet JavaScript SDK. Publishing to npm is automated via GitHub Actions, but the version bump and changelog update are done by hand.

## Overview

Releases follow [Semantic Versioning](https://semver.org/) and [Keep a Changelog](https://keepachangelog.com/) conventions. Every release consists of:

1. A "Prepare for release" PR that bumps the version and closes out the changelog.
2. A merged commit on `mainline` published as a GitHub Release (which also creates the tag).
3. Automated npm publishing triggered by the GitHub Release event.

## Prerequisites

- Write access to the `smartsheet/smartsheet-javascript-sdk` repository.
- npm account with publish rights to the `smartsheet` package (only needed for troubleshooting; normal publishing is done via OIDC in CI).
- Node.js installed locally (any version in the 20/22/24 range). Note: CI builds and publishes on Node 24; the coverage matrix tests 20, 22, and 24.

## Step-by-Step Process

### 1. Decide the version bump

Review the `## [X.X.X] - Unreleased` section in `CHANGELOG.md` and apply semver rules:

| Change type | Bump |
| --- | --- |
| New endpoints, non-breaking additions | `minor` |
| Bug fixes, dependency updates | `patch` |
| Breaking API changes, removed exports | `major` |

### 2. Create a "Prepare for release" pull request

Open a branch from `mainline` (e.g., `release/v5.2.0`) and make the following changes:

#### a. Update `CHANGELOG.md`

Feature PRs accumulate entries under `## [X.X.X] - Unreleased`. For the release, insert the new versioned header between that placeholder and its content:

```diff
 ## [X.X.X] - Unreleased

+## [5.2.0] - 2026-07-15
+
 ### Added
```

The `## [X.X.X] - Unreleased` placeholder header is never removed — it stays at the top of the file permanently so future PRs have somewhere to add entries.

#### b. Update `package.json`

```diff
-  "version": "5.1.0",
+  "version": "5.2.0",
```

#### c. Update `package-lock.json`

Manually update the two `"version"` fields at the top of `package-lock.json` to match the new version — the root `"version"` and the `"version"` inside `"packages": {"": {...}}`. Do **not** run `npm install` as it can introduce unintended dependency changes if the wrong Node version is active.

#### d. PR title convention

```
Prepare for release vX.X.X
```

Example: `Prepare for release v5.2.0`

### 3. Merge the PR

CI must pass before merging. The `test-build.yaml` workflow runs two jobs:

- **lint** — `npm run lint` (ESLint) + `npm run format` (Prettier check). Both must pass.
- **coverage** — builds the project and runs tests across Node 20, 22, and 24.

### 4. Create and publish the GitHub Release

1. Go to **Releases → Draft a new release** in the GitHub UI.
2. In the **Choose a tag** field, type the new version (e.g. `v5.2.0`) and select **Create new tag on publish**.
3. Set the title to `v5.2.0`.
4. Click **Generate release notes** to auto-populate the release body from merged PRs.
5. Click **Publish release**.

The tag is created automatically when the release is published — no separate `git tag` step needed.

Publishing the release (not just saving as a draft) triggers `build-publish.yaml`, which:

- Runs `npm ci` + `npm run build`
- Runs `npm publish` using OIDC trusted publishing (no stored npm token)

### 5. Verify the npm publish

```bash
npm view smartsheet versions --json | tail -5
# or
npm view smartsheet@5.2.0
```

Confirm the new version appears on [npmjs.com/package/smartsheet](https://www.npmjs.com/package/smartsheet).

## Files Changed in Every Release

| File | What changes |
| --- | --- |
| `CHANGELOG.md` | New versioned header inserted below the permanent `Unreleased` placeholder |
| `package.json` | `version` field bumped |
| `package-lock.json` | Two `"version"` fields updated manually (root + `packages[""]`) |

## Automation

Publishing is fully automated once the GitHub Release is published:

```
GitHub Release (published) → build-publish.yaml → npm publish
```

The workflow uses OIDC (`id-token: write` permission) so no npm token needs to be stored as a secret.

## Troubleshooting

**CI fails on the PR**

- Lint/format failure: run `npm run lint:fix` and `npm run format:fix` locally, commit the result.
- Coverage failure: check the test output for the failing Node version.

**Publish workflow fails after the release is published**

The tag and GitHub Release already exist — do not delete them. Instead:

1. Investigate the failure in the Actions log.
2. Re-trigger the workflow via **Actions → Build and Publish → Re-run jobs**, or push an empty commit to the tag after fixing the root cause.
3. If the root cause requires a code fix, cut a patch release instead.

## Rollback

npm does not support un-publishing versions older than 72 hours. If a bad release ships:

1. Publish a patch release immediately with the fix.
2. Use `npm deprecate smartsheet@5.2.0 "Use 5.2.1 instead"` to warn existing users.

## Checklist

- [ ] Determined correct semver bump
- [ ] `CHANGELOG.md` versioned header inserted below the permanent `Unreleased` placeholder
- [ ] `package.json` version bumped
- [ ] `package-lock.json` two `"version"` fields updated manually
- [ ] PR title: `Prepare for release vX.X.X`
- [ ] CI passes on the PR (lint + format + coverage on Node 20/22/24)
- [ ] PR merged to `mainline`
- [ ] GitHub Release created: tag `vX.X.X` set to **Create new tag on publish**, release notes generated via "Generate release notes" button, **published** (not draft)
- [ ] npm version verified post-publish
