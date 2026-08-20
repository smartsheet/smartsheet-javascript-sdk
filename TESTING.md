# Testing Guide

This guide establishes the mandatory patterns for mock API testing in the Smartsheet JavaScript SDK.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running Mock API Tests](#running-mock-api-tests)
- [Mock API Test Standards](#mock-api-test-standards)
  - [Standardized Test Cases](#standardized-test-cases)
  - [Key Principles](#key-principles)
  - [Test Suite Structure](#test-suite-structure)
- [Additional Rules](#additional-rules)
- [Helper Functions](#helper-functions)

---

## Getting Started

### Prerequisites

Mock API tests require WireMock running locally on port 8082. The WireMock server provides simulated API responses for contract testing without hitting the live Smartsheet API.

For WireMock setup instructions, mapping documentation, and details on `x-request-id` and `x-test-name` header usage, see the [smartsheet-sdk-tests](https://github.com/smartsheet/smartsheet-sdk-tests) repository.

For complete test examples, see [tests/mock_api/reports/](test/mock-api/reports/).

### Running Mock API Tests

| Command | Purpose |
|---------|---------|
| `npm test` | Run all tests |
| `npm run test-mock-api` | Run mock API tests only |
| `npm test -- test/mock-api/reports/create_report.spec.ts` | Run specific test suite |
| `npm test -- test/mock-api/reports/create_report.spec.ts -t "createReport generated url is correct"` | Run specific test |

---

## Mock API Test Standards

### Standardized Test Cases

Every endpoint must implement these test cases (using camelCase naming for JavaScript):

**Required Tests:**

1. **`<method> generated url is correct`**
   - Asserts request method
   - Asserts URL path
   - Asserts query parameters (even if empty - use `.toEqual({})`)
   - Does NOT assert request/response body

2. **`<method> all response body properties`**
   - Asserts request body always (for POST/PUT/PATCH with body, assert the object; for GET/DELETE with no body, assert `.toEqual('')`)
   - Asserts response body with all properties
   - Does NOT assert method, URL, or query parameters

3. **`<method> error 400 response`**
   - Asserts ONLY that SDK returns expected client error (status code and message)

4. **`<method> error 500 response`**
   - Asserts ONLY that SDK returns expected server error (status code and message)

**Optional Tests:**

- **`<method> required response body properties`** - Include ONLY if a corresponding WireMock mapping exists for the required-properties variant. Asserts request body always (for POST/PUT/PATCH with body, assert the object; for GET/DELETE with no body, assert `.toEqual('')`) and minimal response body.
- **Endpoint-specific tests** - Additional tests for unique endpoint behaviors (e.g., scope variants, role differences, state variations)

### Key Principles

#### Full-Object Assertions

Assert objects as a whole using `.toEqual()`, not property-by-property. This ensures extra or missing properties cause test failures.

- **Query parameters:** Assert the entire query parameter object after converting from URLSearchParams
- **Request body:** Assert the entire request body object
- **Response body:** Assert the entire deserialized response object

#### Test Constants

- **Cross-file constants:** Use reusable constants from `common_test_constants.ts` (e.g., `TEST_REPORT_ID`, `ERROR_500_STATUS_CODE`)
- **File-scoped constants:** Define expected responses, request bodies, and query params at the top of each test file

#### WireMock Integration

Each test uses custom headers for WireMock integration:

- **`x-request-id`:** UUID for request tracking (retrieve via `findWireMockRequest`)
- **`x-test-name`:** Targets specific WireMock mapping (e.g., `/reports/create-report/all-response-body-properties`)

See [smartsheet-sdk-tests](https://github.com/smartsheet/smartsheet-sdk-tests) for WireMock mapping conventions and header usage details.

### Test Suite Structure

- **One test file per endpoint:** `test/mock-api/<resource>/<endpoint_name>.spec.ts`
- **One constants file per resource:** `test/mock-api/<resource>/common_test_constants.ts`
- **Gold standard examples:** See Reports tests in `test/mock-api/reports/`

---

## Additional Rules

- **Enums:** Use enums in tests instead of raw string values (e.g., `ReportDestinationType.FOLDER` not `'FOLDER'`)
- **Imports:** Use the `@smartsheet` path alias for SDK imports (e.g., `import { ReportAssetType } from '@smartsheet/reports/types'`)

---

## Helper Functions

**Available in `test/mock-api/utils/utils.ts`:**

- **`createClient()`** - Creates a Smartsheet client configured to point at WireMock server (http://127.0.0.1:8082/2.0/)
- **`findWireMockRequest(requestId: string)`** - Retrieves a request from WireMock's admin API using the `x-request-id` header. Returns request object with `absoluteUrl`, `body`, `headers`, `method`, etc.
