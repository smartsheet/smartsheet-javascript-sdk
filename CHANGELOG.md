# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [X.X.X] - Unreleased
### Added
- Support for PUT /sheets/{sheetId}/dataclassification endpoint (Set Data Classification)
- Support for DELETE /sheets/{sheetId}/dataclassification endpoint (Remove Data Classification)
- Added `dataClassification` field to Sheet model

## [5.3.0] - 2026-08-12

### Added

- Added support for the `include` query parameter on `users.listUserPlans` (`GET /2.0/users/{userId}/plans`), accepting either an array of `ListUserPlansInclusion` values or a comma-separated string. Arrays are joined into a single comma-separated value. The only currently accepted value is `ListUserPlansInclusion.PLAN_NAME` (`planName`).
- Added an optional `planName` field to each plan in `ListUserPlansResponse`, populated with the owning organization's name when `include=planName` is requested.

### Security

- Bumped `axios` to `^1.18.0` to resolve six security advisories (GHSA-gcfj-64vw-6mp9, GHSA-jqh4-m9w3-8hp9, GHSA-hcpx-6fm6-wx23, GHSA-mwf2-3pr3-8698, GHSA-f4gw-2p7v-4548, GHSA-xj6q-8x83-jv6g), all patched in axios 1.18.0.
- Updated transitive development dependencies via lockfile refresh to resolve ten advisories in `js-yaml`, `brace-expansion`, `fast-uri`, and `@babel/core`. These are dev-only dependencies (linting, testing, build tooling) and are not shipped in the published `dist/`, so runtime consumers were never exposed.

### Fixed

- Fixed all `sharing` methods (`listAssetShares`, `getAssetShare`, `shareAsset`, `updateAssetShare`, `deleteAssetShare`) failing with `404 Not Found` because query parameters (`assetType`/`assetId`) were baked into the request URL and then re-applied by the HTTP layer, producing a duplicated, malformed query string. Query parameters are now applied once. ([#195](https://github.com/smartsheet/smartsheet-javascript-sdk/issues/195))
- Fixed `sharing.updateAssetShare` throwing at runtime because the HTTP requestor did not expose a `patch` method.

## [5.2.0] - 2026-07-09

### Added
- Added support for GET /2.0/reports/{reportId}/scope endpoint (`listReportScope`)
- Added support for GET /2.0/reports/{reportId}/columns endpoint (`listReportColumns`)
- Added support for GET /2.0/reports/{reportId}/columns/{columnVirtualId} endpoint (`getReportColumn`)
- Added support for PUT /2.0/reports/{reportId}/columns/{columnVirtualId} endpoint (`updateReportColumn`)
- Added support for DELETE /2.0/reports/{reportId}/columns/{columnVirtualId} endpoint (`deleteReportColumn`)
- Added support for GET /2.0/reports/{reportId}/definition endpoint (`getReportDefinition`)

### Deprecated

- Deprecated `Event.objectId`; use `Event.objectIdStr` instead. `objectId` is numeric only and contains -1 for non-numeric identifiers. It is not scheduled for removal.

## [5.1.0] - 2026-06-26

### Added

- Added support for GET /2.0/sheets/{sheetId}/path endpoint (`getSheetPath`)
- Added support for GET /2.0/reports/{reportId}/path endpoint (`getReportPath`)
- Added support for GET /2.0/sights/{sightId}/path endpoint (`getSightPath`)
- Added support for GET /2.0/folders/{folderId}/path endpoint (`getFolderPath`)
- Added helper functions `getLeaf<Asset>()` and `getLeaf<Asset>Path()` for convenient traversal of the path node objects

## [5.0.1] - 2026-06-10

### Fixed

- Deprecation related corrections

### Added

- Hardcode `paginationType=token` for `listWorkspaces`.

## [5.0.0] - 2026-06-08
### Added
- Added optional `objectIdStr` field to `Event` interface to support alphanumeric object identifiers (AUD-903)
- SDK architecte details in [ADVANCED.md](ADVANCED.md)
- SDK testing standards in [TESTING.md](TESTING.md)
- Added ReportsApi type to [SmartsheetClient](lib/types/SmartsheetClient.ts)
- Added shared `TokenPaginationResponse<T>` interface in [lib/types/TokenPaginationResponse.ts](lib/types/TokenPaginationResponse.ts) for token-based paginated responses.

### Changed
- ⚠️ **BREAKING**: `ListSightsResponse` is now `TokenPaginationResponse<Sight>` instead of extending `TokenPaginationQueryParameters`. Response shape is unchanged (`{ lastKey, data }`), but the type alias replaces the previous interface.
- `listWebhooks` JSDoc updated to reflect Smartsheet API behavior changes effective Jun-03-2026: `pageSize` is server-capped at 10,000, `totalCount` and `totalPages` are returned as `-1`, and webhooks are sorted by creation date (most recent first) instead of name. SDK type signatures unchanged. See [Smartsheet API changelog 2025-08-04](https://developers.smartsheet.com/api/smartsheet/changelog#2025-08-04).

### Removed
- ⚠️ **BREAKING**: Removed deprecated `include`, `exclude`, and `skipRemap` query parameters from `createChildFolder`. These parameters were [deprecated by the Smartsheet API](https://developers.smartsheet.com/api/smartsheet/changelog#deprecated-the-copy-related-query-parameters-for-create-folder-and-create-workspace) (sunset Mar-09-2026) and superseded by the dedicated `copyFolder` endpoint. The `CreateFolderQueryParameters` interface has been removed; `CreateChildFolderOptions` no longer accepts `queryParameters`.
- ⚠️ **BREAKING**: Removed deprecated `includeAll`, `page`, `pageSize`, `modifiedSince`, and `paginationType` from `ListSightQueryParameters`, and removed `pageNumber`, `pageSize`, `totalPages`, and `totalCount` from `ListSightsResponse`. These were [deprecated by the Smartsheet API](https://developers.smartsheet.com/api/smartsheet/changelog#deprecated-includeall-and-offset-based-pagination-for-dashboards) (sunset Jun-03-2026). Use token-based pagination via `maxItems` and `lastKey`.
- ⚠️ **BREAKING**: Removed deprecated `includeAll` from `ListWebhooksQueryParameters`. This was [deprecated by the Smartsheet API](https://developers.smartsheet.com/api/smartsheet/changelog#2025-08-04) (sunset Jun-03-2026). Use offset-based pagination via `page` and `pageSize` (server-capped at 10,000).
- ⚠️ **BREAKING**: Removed deprecated `includeAll`, `page`, `pageSize`, and `paginationType` from `listWorkspaces` query parameters, along with the accompanying `[DEPRECATED]` and `[VALIDATION ERROR]` `console.warn` calls. These were [deprecated by the Smartsheet API](https://developers.smartsheet.com/api/smartsheet/changelog#2025-08-04) (sunset Jun-03-2026). The `listWorkspaces` response no longer exposes `pageNumber`, `pageSize`, `totalPages`, or `totalCount`. Use token-based pagination via `maxItems` and `lastKey`.
- ⚠️ **BREAKING**: Removed `listPublicTemplates` and `listUserCreatedTemplates` from the `templates` resource. The `templates` factory and the `client.templates` accessor have been removed entirely. The underlying `GET /templates` and `GET /templates/public` endpoints were [deprecated by the Smartsheet API](https://developers.smartsheet.com/api/smartsheet/changelog#2025-08-04) (sunset Jun-03-2026). Migrate to `getWorkspaceChildren` / `getFolderChildren` with `childrenResourceTypes` including `teamplates,sheets` to list templates within a specific workspace or folder.
- ⚠️ **BREAKING**: Removed `getFolder` and `listChildFolders` from the `folders` resource, and `getWorkspace` and `listWorkspaceFolders` from the `workspaces` resource. The `GetFolderQueryParameters`, `GetFolderOptions`, `ListChildFoldersQueryParameters`, `ListChildFoldersOptions`, and `ListChildFoldersResponse` types have been removed. The underlying `GET /folders/{folderId}`, `GET /folders/{folderId}/folders`, `GET /workspaces/{workspaceId}`, and `GET /workspaces/{workspaceId}/folders` endpoints were [deprecated by the Smartsheet API](https://developers.smartsheet.com/api/smartsheet/changelog#2025-08-04) (sunset Jun-03-2026). Migrate to `getFolderMetadata` + `getFolderChildren` and `getWorkspaceMetadata` + `getWorkspaceChildren`. Use `childrenResourceTypes` to filter the children response (e.g., `folders` to replicate the old list-folders behavior).
- ⚠️ **BREAKING**: Removed the deprecated `shares` methods (`listShares`, `getShare`, `share`, `updateShare`, `deleteShare`) from the `sheets`, `reports`, `sights`, and `workspaces` resources. The underlying asset-specific sharing endpoints were [deprecated by the Smartsheet API](https://developers.smartsheet.com/api/smartsheet/changelog#2025-08-04) (sunset Jun-03-2026). Migrate to `client.sharing` (`listAssetShares`, `getAssetShare`, `shareAsset`, `updateAssetShare`, `deleteAssetShare`), passing `assetType` and `assetId`. Note updates now use `PATCH` instead of `PUT`.

### Fixed
- Aligned the [reports mock api tests](test/mock-api/reports/) with the testing standards.

## [4.8.0] - 2026-04-30
### Added
- Support for new CONTRIBUTOR seat type in `SeatTypes` enum
- Support for `displayContributorSeatType` query parameter in `listAllUsers` and `listUserPlans` endpoints
- WireMock integration tests for CONTRIBUTOR seat type filtering and responses
- WireMock integration test for downgrading users to CONTRIBUTOR seat type
- Comprehensive tests for `displayContributorSeatType` query parameter behavior
- Added support for PATCH /2.0/reports/{reportId}/definition endpoint
- WireMock integration tests for contract testing for PATCH /2.0/reports/{reportId}/definition endpoint
- Support for POST /reports/{reportId}/scope endpoint
- Support for DELETE /reports/{reportId}/scope endpoint
- Support for DELETE /reports/{reportId} endpoint
- Added support for POST /2.0/reports/{reportId}/columns endpoint
- Added support for POST /2.0/reports endpoint (create report)
- WireMock integration tests for contract testing for POST /2.0/reports endpoint

### Fixed
- `buildUrl` in [lib/utils/httpRequestor.js](lib/utils/httpRequestor.js) now accounts for the fact that `baseUrl` does not have a trailing slash.
- Removed trailing slash from `getContact` to account for the fix above.

## [4.7.2] - 2026-03-17
### Fixed
- App crashing after updating to v4.7.1 with logLevel set to 'info' [#158](https://github.com/smartsheet/smartsheet-javascript-sdk/issues/158)
- getSheet API returns 404 Not Found for existing sheet [#161](https://github.com/smartsheet/smartsheet-javascript-sdk/issues/161)

## [4.7.1] - 2026-02-12
### Added
- WiremMock integration tests for contract testing for GET /2.0/users/{userId}/plans and GET /2.0/users endpoints
- WireMock integration tests for contract testing for POST /2.0/users/{userId}/plans/{planId}/upgrade and POST /2.0/users/{userId}/plans/{planId}/downgrade
- WireMock integration tests for contract testing for DELETE /2.0/users/{userId}/plans/{planId} endpoint
- Remove trailing slashes from routes
### Updated
- listAllUsers url generation
- Folder structure for the Users related WireMock tests
- Update endpoint and sheet tests
### Fixed
- Update dependencies to mitigate vulnerabilities (especially CVE-2026-25639)

## [4.7.0] - 2025-06-30
### Added
- Support for new asset-based sharing endpoints in a new `sharing` module:
  - `listAssetShares`: List all shares for a specified asset
  - `getAssetShare`: Get a specific share for a specified asset
  - `shareAsset`: Share an asset with specified users and/or groups
  - `updateAssetShare`: Update a specific share for a specified asset
  - `deleteAssetShare`: Delete a specific share for a specified asset
- Added TypeScript interfaces and enums for the sharing API

### Updated
- Deprecated old sharing endpoints in the `share` module
- Added backward compatibility wrappers in sheets, reports, workspaces, and sights modules
- Added deprecation notices and migration examples in documentation
- Fix typo in SightsApi (`getSightPublshStatus` to `getSightPublishStatus`)

## 4.6.0 - 2025-09-25
### Added
  - Support for upgrade/downgrade endpoints
  - Support for GET /users/{userId}/plans
  - Support for DELETE /users/{userId}/plans/{planId}

## [4.5.0] - 2025-08-25
### Added
  - Token-based pagination support for `workspaces.listWorkspaces()` method with `paginationType`, `lastKey` and `maxItems` parameters.

## [4.4.0] - 2025-08-05
### Added
- Added new workspace and folder endpoints.
  - `getWorkspaceMetadata()` - Returns workspace metadata only
  - `getWorkspaceChildren()` - Returns workspace child items with token-based pagination
  - `getFolderMetadata()` - Returns folder metadata only
  - `getFolderChildren()` - Returns folder child items with token-based pagination

### Deprecated
- Deprecated the following Workspace and Folder endpoints:
  - `getWorkspace()` - Use both `getWorkspaceMetadata()` and `getWorkspaceChildren()` instead
  - `listWorkspaceFolders()` - Use `getWorkspaceChildren()` with `childrenResourceTypes=folders` instead
  - `getFolder()` - Use both `getFolderMetadata()` and `getFolderChildren()` instead
  - `listChildFolders()` - Use `getFolderChildren()` with `childrenResourceTypes=folders` instead
- Deprecated the Home endpoints. See the [Migrate from using the Sheets folder](https://developers.smartsheet.com/api/smartsheet/guides/updating-code/migrate-from-using-the-sheets-folder) page on the API site for guidance on adapting to this deprecation. The deprecated endpoints are:
  - `listContents()`
  - `listFolders()`
  - `createFolder()`

## [4.3.0] - 2025-26-27
### Added
- ESLint Rule for enforcing type imports.
- Convert the Search module to TypeScript.
- Convert the Sights module to TypeScript.
- Convert the Contacts module to TypeScript.

## [4.2.3] - 2025-05-5
### Added
- Fix issue with PUT and POST methods where the body wasn't passed on retries.

## [4.2.2] - 2025-04-14
### Added
- Transition from gulp/jshint to eslint/prettier
- Deprecate home module

## [4.2.1] - 2025-2-21
### Added
- Convert "events" module to typescript

## [4.2.0] - 2025-2-18
### Added
- Convert app entry to a typescript file

## [4.1.1] - 2025-2-4
### Fix
- Fix an edge case where the calcRetryBackoff function could potentially be undefined.

## [4.1.0] - 2025-2-4
### Added
- Basic TypeScript Support

## [4.0.2] - 2023-10-23
### Fixed
- Resolved [Issue#44](https://github.com/smartsheet/smartsheet-javascript-sdk/issues/44) by using `mime` to generate `Content-Type` based on file extension.

## [4.0.1] - 2023-10-20
### Fixed
- Resolved `4.0.0` issue with handling errors

## [4.0.0] - 2023-10-20
### Security
- Removed `request` dependency and replaced it with `Axios`
- Resolved issue in v3.1.3 with PUT/POST requests

## [3.1.4] - 2023-08-22
### Revert
- Reverted changes in release v3.1.3 as it introduced a bug with PUT/POST requests.

## [3.1.3] - 2023-08-22
### Security
- Removed `request` dependency and replaced it with `Axios`

## [3.1.2] - 2023-06-13
### Fixed
- Added missing euBaseURI constant for smartsheet.eu
## [3.1.1] - 2023-06-07
### Added
- Developer program agreement note to README
## [3.1.0] - 2023-02-14
### Added
- Support for deactivate user endpoint
- Support for reactivate user endpoint
## [3.0.0] - 2022-12-05
### Updated
- Migrated SDK to new project
- Update supported versions to 14, 16 and 18
### Added
- Add Github Actions pipeline
### Fixed
- Updated code to adhere to jshint linting
## [2.126.0] - 2021-05-07
### Updated
- Bump lodash from 4.17.19 to 4.17.21
- Bump handlebars from 4.5.3 to 4.7.7
- Bump underscore from 1.9.1 to 1.12.1
- Bump y18n from 3.2.1 to 3.2.2
- Bump ini from 1.3.5 to 1.3.7

## [2.101.0] - 2020-09-01
### Added
- Add support for custom properties in header
### Fixed
- addImageToCell throws TypeError: preview.substring is not a function
### Updated
- Bump handlebars from 4.1.2 to 4.5.3
- Bump lodash from 4.17.14 to 4.17.19

## [2.86.0] - 2019-11-19
### Added
- support for profile images

## 2.77.3 - Aug 16, 2019
- Added support for the following sheet summary methods:
    - `sheets.getSummary`
    - `sheets.getSummaryFields`
    - `sheets.addSummaryFields`
    - `sheets.deleteSummaryFields`
    - `sheets.updateSummaryFields`
    - `sheets.addSummaryFieldImage`

## 2.77.2 - Aug 9, 2019
- Updated the following dependencies due to security vulnerabilities:
    - `set-value`
    - `union-value`
    - `mixin-deep`
    - `lodash`
    - `lodash.merge`

## 2.77.1 - June 6, 2019
- Updated `js-yaml` and `handlebars` dependencies due to security vulnerabilities
- Automated publication process to npm using Travis CI

## 2.77.0 - May 9, 2019
- Added events endpoint to retrieve events that are occurring in your Smartsheet plan.

## 1.5.0 - February 18, 2019
- Updated documentation regarding the usage of baseUrl to clarify how clients can access smartsheetgov
- Added constant for smartsheetgov

## 1.4.2 - February 11, 2019
- Update `extend` dependency version to resolve security vulnerability

## 1.4.1 - December 7, 2018

### Security
- CVE-2016-10540: Updated `minimatch` dev dependency.
- CVE-2018-1000620: Updated `cryptiles` dependency package lock.
- Updated `gulp` and `gulp-jshint` dev dependencies to resolve lower-level npm audit findings.

## 1.4.0 - June 29, 2018
### Added
- Added support for bulk creation of favorites: `favorites.addMultipleToFavorites`.

### Fixed
- Fixed a number of methods that mutated the options struct

### Security
- CVE-2017-16042: Updated `mocha` and `gulp-mocha` dev dependencies to transitively update vulnerable versions of `growl`.

## 1.3.0 - May 2, 2018
### Added
- Added support for import sheet from XLSX, CSV file endpoints

### Fixed
- Fixed bug that incorrectly formatted the Update Rows url when `rowId` was passed
- Fixed bug preventing users from passing header options (assume user, Smartsheet change agent, etc.) to the `server.getInfo` and `add<Object>ToFavorites` methods

### Security
- CVE-2018-3728: Updated `request` dependency, updating descendant `hoek` to a version patching the vulnerability.

## 1.1.0 - March 16, 2018
### Added
- Add automation rule support
- Add sort rows support
- Add cross sheet reference support
- Add arbitrary request support
- Add file path support for file attachment methods:
    - sheets.addFileAttachment
    - sheets.attachNewVersion
    - sheets.addCommentFileAttachment
    - sheets.addRowFileAttachment
    - sheets.addImageToCell
    - request.postFile
- Add `userAgent` argument to client constructor. Value is appended to user agent string.
- Add `baseUrl` argument to client constructor

### Changed
- Set gzip encoding header

### Fixed
- Fixed bug preventing query params from being used with `searchAll`

## 1.0.4 - February 2, 2018
### Added
- Add webhook 'Change Agent' header support

## 1.0.3 - November 21, 2017
### Added
- Add mock api tests

### Fixed
- Fix copy/move row to another sheet


## 1.0.1 - October 26, 2017
### Fixed
- Fix node 4.8.4 compatibility bugs


## 1.0.0 - October 20, 2017
### Added
- Add NPM version number badge
- Add `deleteRows`

### Changed
- Allow list of objectIds to be passed in `removeFavorites`
- Improve README

### Fixed
- Fix list sights
- Fix `getSheetAs<filetype>` endpoints


## 1.0.0 Beta - October 6, 2017
### Added
- Add TravisCI and Coveralls support
- Add logging
- Add request retry
- Add images support
- Add tokens support
- Add Webhooks support
- Add move/copy sheet support
- Add file attachment support
- Add update request support
- Add full sight support
- Add alternate email support
- Add assume user support

### Changed
- Improve README
## 0.2.0 - April 24, 2017
### Added
- Add contacts support

## 0.1.0 - April 7, 2017
### Added
- Add Smartsheet Sights support

## 0.0.8 - March 31, 2017
### Changed
- Remove hardcoded sheet id in sample code

## 0.0.7 - March 31, 2017
### Changed
- Use `SMARTSHEET_API_HOST` instead of `HOST`

## 0.0.6 - March 31, 2017
### Added
- Add getSheet tests

### Fixed
- Fix options cloning issue

## 0.0.5 - January 13, 2016
### Fixed
- Fix deleteRow to handle bulk delete of rows
- Fix urlOptions undefined bug when using smartsheet.workspaces.listWorkspaces()

## 0.0.4 - August 12, 2015
### Changed
- Update readme

## 0.0.3 - August 12, 2015
### Changed
- Add example usage
- Streamline readme

## 0.0.2 - August 12, 2015
### Changed
- Comment out debug statements
- Update readme
### Fixed
- Bug fixes


## 0.0.1 - April 27, 2015
### Added
- Initial commit
