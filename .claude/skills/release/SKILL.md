---
name: release
description: Use when cutting a new release of the Smartsheet JavaScript SDK — version bump, changelog, tag, and GitHub Release
---

# Release

## Overview

Step-by-step workflow for releasing a new version of the Smartsheet JavaScript SDK. Covers version decision, changelog update, PR creation, tagging, and GitHub Release. npm publishing is automated by CI once the GitHub Release is published.

**Authoritative reference:** `RELEASE.md` in the repository root.

## When to Use

Use when:
- User asks to cut a release or bump the version
- It's time to ship accumulated changes from `mainline`
- A hotfix needs to be published urgently

Do NOT use for:
- Adding features or fixing bugs (those are separate PRs merged first)
- Updating CI or tooling without a version change

## Prerequisites

- All intended changes already merged to `mainline`
- CI is green on `mainline`
- Write access to the repo and permission to push tags

## Release Workflow

```
mainline (green) → decide version → "Prepare for release" PR → merge → GitHub Release (creates tag) → npm publish (auto)
```

## Step-by-Step Process

### 1. Determine the version bump

Read `CHANGELOG.md` `## [X.X.X] - Unreleased` section.

| What's in Unreleased | Bump |
|---|---|
| New endpoints, non-breaking additions | `minor` |
| Bug fixes, dependency bumps | `patch` |
| Removed exports, breaking changes | `major` |

Compute the new version from `package.json` `"version"` field.

### 2. Create release branch

```bash
git checkout mainline
git pull origin mainline
git checkout -b release/vX.X.X
```

### 3. Update CHANGELOG.md

The file always has an empty `## [X.X.X] - Unreleased` at the top. Transform it like this:

```
Before:
  ## [X.X.X] - Unreleased
  ### Added
  - ...

After:
  ## [X.X.X] - Unreleased

  ## [NEW_VERSION] - YYYY-MM-DD
  ### Added
  - ...
```

**Rules:**
- Insert the new versioned header below the `Unreleased` line — do not remove or rename the `Unreleased` line
- Use the actual new version number and today's date in `YYYY-MM-DD` format
- The `## [X.X.X] - Unreleased` line at the top is permanent — it stays for every release

### 4. Update package.json

Change the `"version"` field to the new version.

### 5. Regenerate package-lock.json

```bash
npm install
```

This syncs the lockfile without installing new deps.

### 6. Verify the build

```bash
npm run build
npm test
```

Both must pass before creating the PR.

### 7. Create the pull request

```bash
git add CHANGELOG.md package.json package-lock.json
git commit -m "Prepare for release vX.X.X"
git push -u origin release/vX.X.X
gh pr create --title "Prepare for release vX.X.X" --body "Release prep: bump version to X.X.X and close out changelog."
```

Wait for CI to pass, then merge.

### 8. Publish the GitHub Release

Use the GitHub UI:
1. Go to **Releases → Draft a new release**.
2. In **Choose a tag**, type `vX.X.X` and select **Create new tag on publish**.
3. Set the title to `vX.X.X`.
4. Click **Generate release notes** to auto-populate the body from merged PRs.
5. Click **Publish release**.

The tag is created by GitHub when the release is published — no separate `git tag` step.

**Publishing the release (not saving as draft) triggers npm publish automatically.**

### 9. Verify npm publication

```bash
npm view smartsheet@X.X.X
```

Confirm the version appears and `dist/` contains the expected files.

## Verification Checklist

- [ ] Semver bump is correct for the changes included
- [ ] `CHANGELOG.md`: new versioned header inserted below the permanent `Unreleased` line
- [ ] `package.json` version matches new version
- [ ] `package-lock.json` regenerated
- [ ] PR title: `Prepare for release vX.X.X`
- [ ] CI passed on the PR (lint + coverage on Node 20/22/24)
- [ ] PR merged to `mainline`
- [ ] GitHub Release created: tag `vX.X.X` as **Create new tag on publish**, release notes via "Generate release notes", **published** (not draft)
- [ ] `npm view smartsheet@X.X.X` confirms publication

## What CI Does Automatically

Once the GitHub Release is published, `build-publish.yaml` runs:
1. `npm ci` — clean install
2. `npm run build` — TypeScript compilation to `dist/`
3. `npm publish` — publishes to npmjs.com using OIDC (no stored token)

You do not need to run `npm publish` locally.

## Common Mistakes

| Mistake | Fix |
|---|---|
| Forgetting to keep empty Unreleased block at top | Always add `## [X.X.X] - Unreleased` above the new versioned section |
| Saving GitHub Release as draft instead of publishing | CI only triggers on `published` event — must click Publish |
| Running `npm publish` locally | Not needed; CI handles it. Running locally may publish without the built `dist/` |
| Wrong semver bump | Re-read the Unreleased section; a new endpoint is `minor`, not `patch` |

## Rollback

npm does not support un-publishing versions older than 72 hours:

1. Publish a patch release immediately with the fix.
2. Deprecate the bad version: `npm deprecate smartsheet@X.X.X "Use X.X.(X+1) instead"`
