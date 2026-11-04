#!/usr/bin/env bash
# Packaged-library check: builds and packs the SDK, installs the tarball into
# a plain-JS consumer and a strict TypeScript consumer, and verifies both.
# Catches problems with dist/ output, main/typings entries, and .d.ts files
# that tests running from source would miss.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
HERE="$REPO_ROOT/scripts/package-check"
FIXTURE="$REPO_ROOT/test/functional/fixtures/client-surface.json"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

cd "$REPO_ROOT"
npm run build >/dev/null
TARBALL="$(npm pack --silent --pack-destination "$TMP")"
TARBALL="$TMP/$TARBALL"

TS_VERSION="$(node -p "require('typescript/package.json').version")"
TYPES_NODE_VERSION="$(node -p "require('@types/node/package.json').version")"

echo "== JS consumer"
cp -R "$HERE/js-consumer" "$TMP/js-consumer"
(cd "$TMP/js-consumer" && npm init -y >/dev/null && npm install --silent --no-audit --no-fund "$TARBALL")
(cd "$TMP/js-consumer" && node index.cjs "$FIXTURE")

echo "== TS consumer"
cp -R "$HERE/ts-consumer" "$TMP/ts-consumer"
(cd "$TMP/ts-consumer" && npm init -y >/dev/null && npm install --silent --no-audit --no-fund "$TARBALL" "typescript@$TS_VERSION" "@types/node@$TYPES_NODE_VERSION")
(cd "$TMP/ts-consumer" && npx tsc -p tsconfig.json --noEmit)
echo "TS consumer compiled"

echo "Package check passed"
