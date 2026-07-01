# Release Procedure

This document describes the manual release process for the Smartsheet JavaScript SDK. Publishing to npm is automated via GitHub Actions, but the version bump and changelog update are done by hand.

## Overview

Releases follow [Semantic Versioning](https://semver.org/) and [Keep a Changelog](https://keepachangelog.com/) conventions. Every release consists of:

1. A "Prepare for release" PR that bumps the version and closes out the changelog.
2. A merged commit on `mainline` that is tagged and published as a GitHub Release.
3. Automated npm publishing triggered by the GitHub Release event.



## Prerequisites

- Write access to the `smartsheet/smartsheet-javascript-sdk` repository.
- npm account with publish rights to the `smartsheet` package (only needed for troubleshooting; normal publishing is done via OIDC in CI).
- Node.js 20+ and npm installed locally.



## Step-by-Step Process



### 1. Decide the version bump

Review the `## [X.X.X] - Unreleased` section in `CHANGELOG.md` and apply semver rules:


| Change type                           | Bump    |
| ------------------------------------- | ------- |
| New endpoints, non-breaking additions | `minor` |
| Bug fixes, dependency updates         | `patch` |
| Breaking API changes, removed exports | `major` |




### 2. Create a "Prepare for release" pull request

Open a branch from `mainline` (e.g., `release/v5.2.0`) and make the following changes:

#### a. Update `CHANGELOG.md`

Insert the new versioned header **between** the existing `Unreleased` line and its content. The `Unreleased` block stays in place; the version header is added below it:

```diff
 ## [X.X.X] - Unreleased
 
+## [5.2.0] - 2026-07-15
+
 ### Added
```

The `## [X.X.X] - Unreleased` line is never removed or renamed — it permanently lives at the top of the file as an empty placeholder for the next release.

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

Ensure CI passes (lint + coverage matrix across Node 20/22/24) before merging.

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


| File                | What changes                                                               |
| ------------------- | -------------------------------------------------------------------------- |
| `CHANGELOG.md`      | New versioned header inserted below the permanent `Unreleased` line        |
| `package.json`      | `version` field bumped                                                     |
| `package-lock.json` | Two `"version"` fields updated manually (root + `packages[""]`) |




## Automation

Publishing is fully automated once the GitHub Release is published:

```
GitHub Release (published) → build-publish.yaml → npm publish
```

The workflow uses OIDC (`id-token: write` permission) so no npm token needs to be stored as a secret.

## Rollback

npm does not support un-publishing versions older than 72 hours. If a bad release ships:

1. Publish a patch release immediately with the fix.
2. Use `npm deprecate smartsheet@5.2.0 "Use 5.2.1 instead"` to warn existing users.



## Checklist

- [ ] Determined correct semver bump
- [ ] `CHANGELOG.md` new versioned header inserted below the permanent `Unreleased` line
- [ ] `package.json` version bumped
- [ ] `package-lock.json` version fields updated manually
- [ ] PR title: `Prepare for release vX.X.X`
- [ ] CI passes on the PR
- [ ] PR merged to `mainline`
- [ ] GitHub Release created: tag `vX.X.X` set to **Create new tag on publish**, release notes generated via "Generate release notes" button, **published** (not draft)
- [ ] npm version verified post-publish