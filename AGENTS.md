# AI Agent Workflows

This repository uses workflow-specific agents to handle different phases of SDK development. Each agent is backed by a detailed skill file that defines the workflow, and this document provides the project-specific context agents need to work effectively in this codebase.

## Available Agents

- **Implementation Agent** - Adding or modifying API endpoints
- **Review Agent** - Reviewing endpoint implementations before merge
- **Release Agent** - Cutting a new SDK release (version bump, changelog, tag, GitHub Release)

---

## Implementation Agent

### Purpose

Adding or modifying Smartsheet API endpoints in the JavaScript SDK. Ensures OpenAPI spec compliance, correct TypeScript patterns, and mandatory test coverage.

### Skill Reference

**Skill file:** `.claude/skills/implement-api-endpoint/SKILL.md`

This skill provides the detailed implementation workflow. Read the skill file for the complete process, prerequisites, and step-by-step instructions.

### When to Use

Use the Implementation Agent when:
- User requests endpoint implementation
- Adding a new API endpoint to the SDK
- Modifying existing endpoint behavior
- Updating an endpoint for a new API version

Do NOT use for:
- Bug fixes in existing endpoints (unless spec changed)
- Refactoring without behavior changes
- Documentation-only changes

### Project Context

#### OpenAPI Specification

**Location:** `https://developers.smartsheet.com/_spec/api/smartsheet/openapi.json`

**Usage:** OpenAPI spec is the source of truth. Implementation and tests must match the spec exactly. Extract operation IDs, paths, parameters, request/response schemas, and required vs optional properties from the spec.

**Verification:**
```bash
# Check endpoint in public spec
curl -s https://developers.smartsheet.com/_spec/api/smartsheet/openapi.json | jq '.paths."/endpoint-path"'
```

#### WireMock Mappings

**Location:** `https://github.com/smartsheet/smartsheet-sdk-tests`

**Usage:** WireMock mappings are required for running tests. Clone the smartsheet-sdk-tests repo to access mappings for each resource.

**Structure:**
```
smartsheet-sdk-tests/
  wiremock/
    <resource>/
      <endpoint>-<variant>.json
```

**Setup:**
```bash
git clone https://github.com/smartsheet/smartsheet-sdk-tests.git
ls smartsheet-sdk-tests/wiremock/<resource>/
```

#### Required Documentation

**ADVANCED.md sections to read:**
- **Resource Module Organization** (line 254-286) - Factory pattern, module structure
- **Request Lifecycle** (line 41-85) - How requests flow through the SDK
- **Response Handling** (line 87-118) - Response processing patterns
- **Serialization** (line 167-195) - Data transformation patterns

**Key patterns:**
- Factory function pattern: `create(options)` returns object with methods
- URL construction: Template literals with IDs
- TypeScript for new code, JavaScript for legacy
- Requestor methods: `get()`, `post()`, `put()`, `delete()`

#### Testing Requirements

**Source:** `TESTING.md`

**4 Required Tests (always implement):**
1. `<method> generated url is correct` - Asserts method, URL, query params only
2. `<method> all response body properties` - Asserts request/response body only
3. `<method> error 400 response` - Client error handling
4. `<method> error 500 response` - Server error handling

**2 Optional Tests (conditional on WireMock mappings):**
5. `<method> required response body properties` - Only if WireMock mapping exists
6. Endpoint-specific test - Only if applicable and mapping exists

**Test patterns:**
- Use `createClient()` from `test/mock-api/utils/utils.ts`
- Use `findWireMockRequest()` from utils for request verification
- Whole-object assertions with `.toEqual()`, not property-by-property
- Use enums (e.g., `ReportDestinationType.FOLDER`), not raw strings
- Request tracking with `x-request-id` and `x-test-name` headers

#### Gold Standard Examples

**Location:** `test/mock-api/reports/`

**Files to reference:**
- `test/mock-api/reports/create_report.spec.ts`
- `test/mock-api/reports/get_report.spec.ts`
- `test/mock-api/reports/list_reports.spec.ts`

**What to learn:**
- Test file structure and naming
- Whole-object assertion patterns
- WireMock integration (x-request-id, x-test-name headers)
- Enum usage
- Helper function usage (createClient, findWireMockRequest)
- Constants organization (common_test_constants.ts)

Use these as templates when implementing new endpoint tests.

#### Type Conventions

**Location:** `lib/{apiGroup}/types.ts`

**Rule:** ALL type definitions for an API group must be in a single file. For example, all Reports types go in `lib/reports/types.ts`.

**What to define:**
- Query parameters interface (if endpoint has query params)
- Request body interface (for POST/PUT/PATCH)
- Response data interfaces
- Response wrapper interface
- Options interface extending `RequestOptions<QueryParams, Body>`
- Method signature in API interface (e.g., `ReportsApi`)

**If API interface exists:** Add the interface to `SmartsheetClient` in `lib/types/SmartsheetClient.ts`.

#### Prerequisites Check

**Before starting implementation, verify you have:**
- [ ] OpenAPI spec for the endpoint (public spec or user-provided)
- [ ] WireMock mappings for the endpoint (smartsheet-sdk-tests repo or user-provided)
- [ ] Both spec and mappings are non-negotiable - STOP if either is missing

---

## Review Agent

### Purpose

Systematic code review for API endpoint implementations. Verifies OpenAPI spec alignment, TypeScript correctness, test completeness, and pattern compliance before merge.

### Skill Reference

**Skill file:** `.claude/skills/review-api-endpoint/SKILL.md`

This skill provides the detailed review workflow. Read the skill file for the complete review checklist, verification steps, and decision matrix.

### When to Use

Use the Review Agent when:
- Reviewing a pull request with endpoint changes
- Verifying endpoint implementation before merge
- Code review requested for API changes
- Quality check before release

Do NOT use for:
- Non-endpoint code reviews
- Documentation-only changes
- Simple bug fixes without spec changes

### Project Context

#### What to Verify

**OpenAPI Spec Alignment:**
- Request parameters match spec (every parameter)
- Request body matches spec schema (every property)
- Response schema matches spec (every property)
- Required vs optional properties correctly marked
- HTTP verb matches spec

**TypeScript Type Safety:**
- All types in correct file: `lib/{apiGroup}/types.ts`
- Query parameters interface exists (if applicable)
- Request body interface exists (for POST/PUT/PATCH)
- Response interfaces match spec schema
- Options interface extends `RequestOptions`
- Method signature added to API interface
- **If API interface exists:** Verify added to `SmartsheetClient` in `lib/types/SmartsheetClient.ts`

**Test Coverage (4 Required Tests):**
1. `<method> generated url is correct` - URL, method, query params
2. `<method> all response body properties` - Full request/response body
3. `<method> error 400 response` - Client error handling
4. `<method> error 500 response` - Server error handling

**Test Coverage (2 Optional Tests - conditional):**
5. `<method> required response body properties` - Only if WireMock mapping exists
6. Endpoint-specific test - Only if applicable and mapping exists

**Test Quality:**
- Using `createClient()` from `test/mock-api/utils/utils.ts`
- Using `findWireMockRequest()` from utils.ts
- Whole-object assertions with `.toEqual()`, not property-by-property
- Using enums (e.g., `ReportDestinationType.FOLDER`), not raw strings
- `x-test-name` matches existing WireMock mapping
- Test naming follows TESTING.md convention

**Implementation Patterns:**
- Factory function pattern followed
- URL builder function exists
- Correct requestor method used (get/post/put/delete)
- Options merged correctly
- Method exported in returned object

#### Architecture Patterns

**Reference:** `ADVANCED.md`

**Key sections:**
- Resource Module Organization (line 254-286)
- Request Lifecycle (line 41-85)
- Response Handling (line 87-118)

**Pattern checklist:**
- Factory pattern: `create(options)` returns object
- URL construction: Template literals with IDs
- Request flow: options → requestor → axios
- Error handling follows SDK conventions

#### Testing Standards

**Reference:** `TESTING.md`

**Standards to verify:**
- Test file location: `test/mock-api/<resource>/<endpoint>.spec.ts`
- Constants file: `test/mock-api/<resource>/common_test_constants.ts`
- Full-object assertions (not property-by-property)
- WireMock integration headers (x-request-id, x-test-name)
- Helper function usage from utils.ts

**Gold standard:** Compare implementation against `test/mock-api/reports/` examples.

#### Review Prerequisites

**Before starting review, verify you have:**
- [ ] OpenAPI spec for the endpoint
- [ ] WireMock mappings for the endpoint
- [ ] List of available mappings to check optional tests
- [ ] Access to implementation files
- [ ] Access to test files

**If prerequisites missing:** STOP. Request OpenAPI spec and WireMock mappings before proceeding with review.

#### Review Decision Matrix

**BLOCK (cannot approve):**
- Missing OpenAPI spec or WireMock mappings
- Types not in `lib/{apiGroup}/types.ts`
- API interface not in SmartsheetClient (if interface exists)
- Fewer than 4 required tests
- Optional test exists WITHOUT WireMock mapping
- Type mismatch with spec
- URL path or HTTP verb wrong
- Test `x-test-name` references non-existent mapping

**REQUEST CHANGES:**
- Property-by-property assertions (should use `.toEqual()`)
- Raw strings instead of enums
- Not using helper functions (createClient, findWireMockRequest)
- Missing optional test when WireMock mapping exists
- Missing optional marker (`?`) on optional properties
- Poor test names (not following TESTING.md convention)

**COMMENT (nitpicks):**
- Missing JSDoc documentation
- Minor style issues

#### Verification Commands

```bash
# Check types compile
npm run build

# Find implementation files
grep -r "methodName" lib/<resource>/types.ts
grep -r "methodName" lib/<resource>/index.ts

# Find test files
find test/mock-api/<resource>/ -name "*method*.spec.ts"

# Check if API interface in SmartsheetClient
grep -r "ReportsApi" lib/types/SmartsheetClient.ts

# List available WireMock mappings
ls smartsheet-sdk-tests/wiremock/<resource>/

# Verify test uses enums
grep -r "ReportDestinationType" test/mock-api/<resource>/<method>.spec.ts

# Verify test uses helpers
grep -r "createClient\|findWireMockRequest" test/mock-api/<resource>/<method>.spec.ts

# Check OpenAPI spec for endpoint
curl -s https://developers.smartsheet.com/_spec/api/smartsheet/openapi.json | jq '.paths."/endpoint-path"'
```

---

## Release Agent

### Purpose

Cutting a new SDK release: determining the correct semver bump, updating the changelog, bumping the version, creating the release PR, tagging, and publishing via GitHub Release.

### Skill Reference

**Skill file:** `.claude/skills/releasing-smartsheet-javascript-sdk/SKILL.md`

**Full procedure:** `RELEASE.md` in the repository root — single source of truth for every step, decision rule, and checklist item.

### When to Use

Use the Release Agent when:
- User asks to cut a release or publish a new version
- Accumulated changes on `mainline` need to be shipped
- A hotfix needs to be released urgently

Do NOT use for:
- Implementing features or fixing bugs (merge those first)
- CI or tooling changes without a version bump

---

## Project-Specific Context

This section provides shared context that applies to all agents working in this repository.

### Repository Overview

**Name:** Smartsheet JavaScript SDK

**Purpose:** Client library for the Smartsheet REST API, enabling Node.js applications to interact with Smartsheet programmatically.

**Codebase:** Mixed TypeScript and JavaScript
- New code: TypeScript (`.ts`)
- Legacy code: JavaScript (`.js`)
- Type definitions: TypeScript interfaces

**API Coverage:** Comprehensive coverage of Smartsheet REST API endpoints across multiple resource types (sheets, reports, users, workspaces, folders, etc.)

### Key Documentation Files

| File | Purpose | When to Read |
|------|---------|--------------|
| `README.md` | Installation, basic usage, example code | Getting started, understanding client initialization |
| `ADVANCED.md` | SDK architecture, request lifecycle, patterns | Implementing endpoints, understanding internal flows |
| `TESTING.md` | Test structure, standardized cases, WireMock integration | Writing tests, understanding test requirements |
| `RELEASE.md` | Release procedure, version bump, changelog, tagging | Cutting a new SDK release |

### Test Infrastructure

**Mock API Testing:**
- **Tool:** WireMock for HTTP mocking
- **Port:** 8082 (local development)
- **Mappings:** `https://github.com/smartsheet/smartsheet-sdk-tests`
- **Test location:** `test/mock-api/{resource}/{endpoint}.spec.ts`
- **Helper functions:** `test/mock-api/utils/utils.ts`
  - `createClient()` - Create test client with WireMock configuration
  - `findWireMockRequest(requestId)` - Retrieve recorded request details

**WireMock Integration:**
- Each test uses `x-request-id` (UUID) for request tracking
- Each test uses `x-test-name` to target specific WireMock mapping
- Mappings structured as `/resource/endpoint/variant`

**Running tests:**
```bash
npm test                          # All tests
npm run test-mock-api            # Mock API tests only
npm test -- test/mock-api/reports/create_report.spec.ts  # Specific file
```

### Code Conventions

**TypeScript Usage:**
- All new code must be TypeScript
- Type definitions: `lib/{apiGroup}/types.ts` (single file per API group)
- If API interface exists, add to `SmartsheetClient` in `lib/types/SmartsheetClient.ts`

**Module Structure:**
- Factory pattern: `create(options)` returns object with methods
- Resource modules: `lib/{resource}/index.ts` or `lib/{resource}/index.js`
- URL builders: `build{Method}Url(options)` functions
- Requestor methods: `get()`, `post()`, `put()`, `delete()`

**Naming Conventions:**
- Methods: camelCase (e.g., `createReport`, `getSheet`)
- Types: PascalCase (e.g., `CreateReportOptions`, `GetSheetResponse`)
- Test files: snake_case (e.g., `create_report.spec.ts`)
- Constants: UPPER_SNAKE_CASE (e.g., `TEST_REPORT_ID`)

### Testing Patterns

**Required Tests (4 per endpoint):**
1. URL generation test - Verifies method, path, query params
2. All properties test - Verifies full request/response body
3. 400 error test - Client error handling
4. 500 error test - Server error handling

**Optional Tests (conditional):**
5. Required properties test - Only if WireMock mapping exists
6. Endpoint-specific test - Only if applicable and mapping exists

**Assertion Patterns:**
- Whole-object assertions: Use `.toEqual()` with complete objects
- Query parameters: Assert as object after converting from URLSearchParams
- Request/response bodies: Assert entire object structure
- Enums: Use enum values (e.g., `ReportDestinationType.FOLDER`), not raw strings

**Test Organization:**
- One test file per endpoint
- Constants in `common_test_constants.ts` per resource
- Cross-file constants for reusable values
- File-scoped constants for test-specific data

### Common Patterns

**URL Construction:**
```typescript
// URL construction is typically inline
const url = options.apiUrls.resource + '/' + resourceId + '/endpoint';
```

**Method Implementation:**
```typescript
const methodName = (
  getOptions: MethodOptions,
  callback?: RequestCallback<MethodResponse>
) => {
  const url = options.apiUrls.resource + '/' + getOptions.resourceId + '/endpoint';
  const urlOptions = { url };
  return requestor.get({ ...optionsToSend, ...urlOptions, ...getOptions }, callback);
};
```

**Options Interface:**
```typescript
export interface MethodOptions 
  extends RequestOptions<QueryParameters, RequestBody> {
  resourceId: number;
}
```

**Test Structure:**
```typescript
describe('Resource - methodName endpoint tests', () => {
  it('methodName generated url is correct', async () => {
    const requestId = crypto.randomUUID();
    const client = createClient();
    
    await client.resource.methodName({
      resourceId: TEST_ID,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/resource/method/url-test'
      }
    });
    
    const request = await findWireMockRequest(requestId);
    const parsedUrl = new URL(request.absoluteUrl);
    
    expect(request.method).toEqual('GET');
    expect(parsedUrl.pathname).toEqual('/2.0/resource/123/endpoint');
  });
});
```

### Gold Standard Examples

**Location:** `test/mock-api/reports/`

**Best examples to study:**
- `create_report.spec.ts` - POST with request body, full test coverage
- `get_report.spec.ts` - GET with path params, response assertions
- `list_reports.spec.ts` - GET with query params, pagination patterns
- `common_test_constants.ts` - Shared constants organization

**What these demonstrate:**
- Correct test file structure
- Whole-object assertions with `.toEqual()`
- WireMock integration (headers, request tracking)
- Enum usage vs raw strings
- Helper function usage (createClient, findWireMockRequest)
- Constants organization (shared vs file-scoped)

When implementing or reviewing endpoints, compare against these examples for structure and patterns.
