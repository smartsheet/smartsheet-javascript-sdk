# Mock API Test Rules

## Overview

This document defines the coding standards and best practices for creating mock API tests in the Smartsheet JavaScript SDK. All mock API tests must follow these conventions to ensure consistency, maintainability, and comprehensive coverage.

## Directory Structure

### Location
- All mock API tests MUST be located in `test/mock-api/{{endpoint_group}}/`
- Example: `test/mock-api/users/`, `test/mock-api/folders/`, `test/mock-api/webhooks/`

### Required Files
Each endpoint test directory MUST contain:

1. **`common_test_constants.ts`** - Shared test constants and data
2. **`{{operation_name}}.spec.ts`** - Individual test files for each operation

## Common Test Constants (`common_test_constants.ts`)

### File Structure

The constants file MUST be organized into logical sections:

```typescript
// 1. Common IDs
export const TEST_USER_ID = 12345678;
export const TEST_PLAN_ID = 1234567890123456;

// 2. Common Contact Information
export const TEST_EMAIL = 'test.user@smartsheet.com';
export const TEST_MOBILE_PHONE = '+1234567890';

// 3. Common Names
export const TEST_FIRST_NAME = 'Test';
export const TEST_LAST_NAME = 'User';

// 4. Common Timestamps
export const TEST_LAST_LOGIN = '2020-10-04T18:32:47Z';

// 5. Common Pagination Properties
export const TEST_PAGE_NUMBER = 1;
export const TEST_PAGE_SIZE = 100;

// 6. Common Success Response Values
export const TEST_SUCCESS_MESSAGE = 'SUCCESS';
export const TEST_SUCCESS_RESULT_CODE = 0;

// 7. Common Error Status Codes
export const ERROR_500_STATUS_CODE = 500;
export const ERROR_500_MESSAGE = 'Internal Server Error';
export const ERROR_400_STATUS_CODE = 400;
export const ERROR_400_MESSAGE = 'Malformed Request';

// 8. Common Request Bodies (if applicable)
export const ADD_PROFILE_IMAGE_REQUEST_BODY = Buffer.from('fake-image-data');
```

### Naming Conventions

1. **IDs**: `TEST_{{RESOURCE}}_ID`
   - Example: `TEST_USER_ID`, `TEST_FOLDER_ID`, `TEST_WEBHOOK_ID`

2. **Properties**: `TEST_{{PROPERTY_NAME}}`
   - Example: `TEST_EMAIL`, `TEST_FIRST_NAME`, `TEST_LAST_LOGIN`

3. **Error Constants**: `ERROR_{{STATUS_CODE}}_{{PROPERTY}}`
   - Example: `ERROR_500_STATUS_CODE`, `ERROR_400_MESSAGE`

4. **Success Constants**: `TEST_SUCCESS_{{PROPERTY}}`
   - Example: `TEST_SUCCESS_MESSAGE`, `TEST_SUCCESS_RESULT_CODE`

## Test File Structure (`{{operation_name}}.spec.ts`)

### Required Imports

```typescript
import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    // Import all needed constants from common_test_constants
    TEST_USER_ID,
    TEST_SUCCESS_MESSAGE,
    ERROR_500_STATUS_CODE,
    // ... other constants
} from './common_test_constants';
// Import types if needed
import { SeatTypes, UserStatus } from '@smartsheet/users/types';
```

### Test Suite Structure

Each test file MUST follow this structure:

```typescript
describe('{{EndpointGroup}} - {{operationName}} endpoint tests', () => {
    const client = createClient();

    // Local test constants (operation-specific)
    const localConstant = 'value';

    // Test 1: URL Generation
    it('{{operationName}} generated url is correct', async () => {
        // Test implementation
    });

    // Test 2: All Response Properties
    it('{{operationName}} all response body properties', async () => {
        // Test implementation
    });

    // Test 3: Required Response Properties (if applicable)
    it('{{operationName}} required response body properties', async () => {
        // Test implementation
    });

    // Test 4: Error 500 Response
    it('{{operationName}} error 500 response', async () => {
        // Test implementation
    });

    // Test 5: Error 400 Response
    it('{{operationName}} error 400 response', async () => {
        // Test implementation
    });
});
```

## Test Implementation Patterns

### 1. URL & Query Parameters Generation Test

**Purpose**: Verify the SDK generates the correct URL for the API endpoint.

**CRITICAL**: URL Path and query parameters MUST be verified using EXACT comparison.

**Pattern**:
```typescript
it('{{operationName}} generated url is correct', async () => {
    const requestId = crypto.randomUUID();
    const options = {
        // Required parameters
        userId: TEST_USER_ID,
        // Optional parameters
        queryParameters: {
            param1: value1
        },
        customProperties: {
            'x-request-id': requestId,
            'x-test-name': '/{{endpoint}}/{{operation}}/all-response-body-properties'
        }
    };
    await client.{{endpoint}}.{{operation}}(options);
    const matchedRequest = await findWireMockRequest(requestId);

    const parsedUrl = new URL(matchedRequest.absoluteUrl);
    expect(parsedUrl.pathname).toEqual('/expected/path');

    const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
    expect(queryParamsObject).toEqual({
        param1: value1
    });
});
```

### 2. Response Body Verification

**CRITICAL**: Response bodies MUST be verified using EXACT comparison.

**Pattern for "All Properties" Test**:
```typescript
it('{{operationName}} all response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
        // ... options
        customProperties: {
            'x-request-id': requestId,
            'x-test-name': '/{{endpoint}}/{{operation}}/all-response-body-properties'
        }
    };
    const response = await client.{{endpoint}}.{{operation}}(options);

    // MUST use exact comparison with toEqual
    expect(response).toEqual({
        message: TEST_SUCCESS_MESSAGE,
        resultCode: TEST_SUCCESS_RESULT_CODE,
        data: [
            {
                id: TEST_USER_ID,
                email: TEST_EMAIL,
                // ... ALL properties from the response
            }
        ]
    });
});
```

**Pattern for "Required Properties" Test**:
```typescript
it('{{operationName}} required response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
        // ... options
        customProperties: {
            'x-request-id': requestId,
            'x-test-name': '/{{endpoint}}/{{operation}}/required-response-body-properties'
        }
    };
    const response = await client.{{endpoint}}.{{operation}}(options);

    // MUST use exact comparison with toEqual
    expect(response).toEqual({
        message: TEST_SUCCESS_MESSAGE,
        resultCode: TEST_SUCCESS_RESULT_CODE,
        data: [
            {
                id: TEST_USER_ID,
                email: TEST_EMAIL,
                // ... ONLY required properties
            }
        ]
    });
});
```

### 4. Request Body Verification

**CRITICAL**: Request bodies MUST be verified using EXACT comparison.

**Pattern**:
```typescript
it('{{operationName}} all response body properties', async () => {
    const requestId = crypto.randomUUID();
    const testBody = {
        property1: 'value1',
        property2: 123,
        property3: true
    };
    const options = {
        body: testBody,
        customProperties: {
            'x-request-id': requestId,
            'x-test-name': '/{{endpoint}}/{{operation}}/all-response-body-properties'
        }
    };
    const response = await client.{{endpoint}}.{{operation}}(options);
    const matchedRequest = await findWireMockRequest(requestId);

    // Verify response
    expect(response).toEqual({ /* ... */ });

    // MUST verify request body with exact comparison
    const body = JSON.parse(matchedRequest.body);
    expect(body).toEqual(testBody);
});
```

**For File Uploads**:
```typescript
const matchedRequest = await findWireMockRequest(requestId);
const expectedBody = ADD_PROFILE_IMAGE_REQUEST_BODY.toString();
expect(matchedRequest.body).toEqual(expectedBody);
```

### 5. Error Response Tests

**Pattern for 500 Error**:
```typescript
it('{{operationName}} error 500 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
        // ... parameters
        customProperties: {
            'x-request-id': requestId,
            'x-test-name': '/errors/500-response'
        }
    };
    try {
        await client.{{endpoint}}.{{operation}}(options);
        expect(true).toBe(false); // Expected an error to be thrown
    } catch (error) {
        expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
        expect(error.message).toBe(ERROR_500_MESSAGE);
    }
});
```

**Pattern for 400 Error**:
```typescript
it('{{operationName}} error 400 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
        // ... parameters
        customProperties: {
            'x-request-id': requestId,
            'x-test-name': '/errors/400-response'
        }
    };
    try {
        await client.{{endpoint}}.{{operation}}(options);
        expect(true).toBe(false); // Expected an error to be thrown
    } catch (error) {
        expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
        expect(error.message).toBe(ERROR_400_MESSAGE);
    }
});
```

## Special Cases

### 1. Single Object vs Array Responses

Some APIs return a single object, others return arrays. Tests MUST match the actual API behavior.

**Single Object Response**:
```typescript
expect(response).toEqual({
    id: TEST_ID,
    property: 'value'
    // ... no 'data' array wrapper
});
```

**Array Response**:
```typescript
expect(response).toEqual({
    message: TEST_SUCCESS_MESSAGE,
    resultCode: TEST_SUCCESS_RESULT_CODE,
    data: [
        {
            id: TEST_ID,
            property: 'value'
        }
    ]
});
```

### 2. Paginated Responses

**Pattern**:
```typescript
expect(response).toEqual({
    pageNumber: TEST_PAGE_NUMBER,
    pageSize: TEST_PAGE_SIZE,
    totalPages: TEST_TOTAL_PAGES,
    totalCount: TEST_TOTAL_COUNT,
    data: [
        // ... items
    ]
});
```

### 3. Operations Without Request Body

Some operations (GET, DELETE) don't have request bodies. Skip body verification for these.

```typescript
it('{{operationName}} all response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
        userId: TEST_USER_ID,
        customProperties: {
            'x-request-id': requestId,
            'x-test-name': '/{{endpoint}}/{{operation}}/all-response-body-properties'
        }
    };
    const response = await client.{{endpoint}}.{{operation}}(options);

    // Only verify response, no body verification needed
    expect(response).toEqual({ /* ... */ });
});
```

### 4. Operations with Optional Body

Some operations have optional request bodies. Test both scenarios.

```typescript
it('{{operationName}} with body', async () => {
    const options = {
        body: { seatType: 'MEMBER' },
        // ... other options
    };
    const response = await client.{{endpoint}}.{{operation}}(options);
    const matchedRequest = await findWireMockRequest(requestId);

    const body = JSON.parse(matchedRequest.body);
    expect(body).toEqual({ seatType: 'MEMBER' });
});

it('{{operationName}} without body', async () => {
    const options = {
        // No body parameter
        // ... other options
    };
    const response = await client.{{endpoint}}.{{operation}}(options);
    // No body verification
});
```

## WireMock Mapping Alignment

### Mapping File Structure

Tests MUST align with WireMock mappings from:
- Repository: https://github.com/smartsheet/smartsheet-sdk-tests
- Path: `/mappings/`

### Mapping Naming Convention

The `x-test-name` in test options MUST match the mapping file path:

```typescript
customProperties: {
    'x-request-id': requestId,
    'x-test-name': '/{{endpoint}}/{{operation}}/{{scenario}}'
}
```

**Examples**:
- `/users/get-user/all-response-body-properties`
- `/users/get-user/required-response-body-properties`
- `/errors/500-response`
- `/errors/400-response`

### Coverage Requirements

Tests MUST cover ALL mappings for an endpoint:
1. List all mapping files for the endpoint
2. Create corresponding test cases
3. Verify each mapping is tested

## OpenAPI Spec Compliance

**CRITICAL**: All tests MUST be validated against the OpenAPI specification.

### Spec URL
https://developers.smartsheet.com/_spec/api/smartsheet/openapi.json

### Validation Requirements

1. **Property Names**: Must match spec exactly (case-sensitive)
2. **Property Types**: Must match spec types
3. **Required vs Optional**: Must match spec requirements
4. **Enum Values**: Must match spec exactly
5. **Response Structure**: Must match spec structure

### Validation Process

Before submitting tests:
1. Locate the endpoint in the OpenAPI spec
2. Compare test response objects with spec schemas
3. Verify all properties are present and correctly typed
4. Ensure required properties are always included
5. Verify optional properties are handled correctly

## Test Naming Conventions

### Test Suite Name
```typescript
describe('{{EndpointGroup}} - {{operationName}} endpoint tests', () => {
```

**Examples**:
- `'Users - addUser endpoint tests'`
- `'Folders - copyFolder endpoint tests'`
- `'Webhooks - createWebhook endpoint tests'`

### Test Case Names

1. **URL Generation**: `'{{operationName}} generated url is correct'`
2. **All Properties**: `'{{operationName}} all response body properties'`
3. **Required Properties**: `'{{operationName}} required response body properties'`
4. **Error 500**: `'{{operationName}} error 500 response'`
5. **Error 400**: `'{{operationName}} error 400 response'`

### Multi-word Operations

Use camelCase for operation names in test descriptions:
- `addUser` not `add_user`
- `listAllUsers` not `list_all_users`
- `makeAlternateEmailPrimary` not `make_alternate_email_primary`

## Code Quality Standards

### TypeScript Best Practices

1. **Use explicit types** - Import types from SDK
2. **Use const for test data** - Define constants at suite level
3. **Use async/await** - All test functions are async
4. **Use descriptive variable names** - Clear intent

### Consistency Requirements

1. **Indentation**: 4 spaces (matches project config)
2. **Imports**: Group by category (external, utils, constants, types)
3. **Constants**: Define at top of describe block
4. **Test order**: URL → All Props → Required Props → Errors

### Error Handling

All error tests MUST follow this pattern:
```typescript
try {
    await client.{{endpoint}}.{{operation}}(options);
    expect(true).toBe(false); // Expected an error to be thrown
} catch (error) {
    expect(error.statusCode).toBe(ERROR_STATUS_CODE);
    expect(error.message).toBe(ERROR_MESSAGE);
}
```

## Testing Checklist

Before submitting mock API tests, verify:

- [ ] `common_test_constants.ts` exists with all shared constants
- [ ] Test file follows naming convention `{{operation_name}}.spec.ts`
- [ ] All required imports are present
- [ ] Test suite name follows convention
- [ ] URL generation test exists and passes
- [ ] All response properties test exists with exact comparison
- [ ] Required properties test exists (if applicable) with exact comparison
- [ ] Query parameters verified with exact comparison (if applicable)
- [ ] Request body verified with exact comparison (if applicable)
- [ ] Error 500 test exists and passes
- [ ] Error 400 test exists and passes
- [ ] All tests align with WireMock mappings
- [ ] All tests validated against OpenAPI spec
- [ ] Code passes linting and type checking
- [ ] Test descriptions use camelCase for operation names

## Examples

### Reference Implementations

Use these as canonical examples:
- **Simple GET**: `test/mock-api/users/get_user.spec.ts`
- **GET with Query Params**: `test/mock-api/users/list_users.spec.ts`
- **POST with Body**: `test/mock-api/users/add_user.spec.ts`
- **PUT with Body**: `test/mock-api/users/update_user.spec.ts`
- **DELETE**: `test/mock-api/users/remove_user.spec.ts`
- **File Upload**: `test/mock-api/users/add_profile_image.spec.ts`
- **Multiple Operations**: `test/mock-api/users/user_upgrade_downgrade.spec.ts`

### Quick Reference

**Minimal Test File Template**:
```typescript
import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_RESOURCE_ID,
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('{{EndpointGroup}} - {{operationName}} endpoint tests', () => {
    const client = createClient();

    it('{{operationName}} generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            resourceId: TEST_RESOURCE_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/{{endpoint}}/{{operation}}/all-response-body-properties'
            }
        };
        await client.{{endpoint}}.{{operation}}(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes('/expected/path')).toBeTruthy();
    });

    it('{{operationName}} all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            resourceId: TEST_RESOURCE_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/{{endpoint}}/{{operation}}/all-response-body-properties'
            }
        };
        const response = await client.{{endpoint}}.{{operation}}(options);

        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE,
            // ... complete response structure
        });
    });

    it('{{operationName}} error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            resourceId: TEST_RESOURCE_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.{{endpoint}}.{{operation}}(options);
            expect(true).toBe(false);
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('{{operationName}} error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            resourceId: TEST_RESOURCE_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.{{endpoint}}.{{operation}}(options);
            expect(true).toBe(false);
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
```

## Additional Resources

- **WireMock Mappings**: https://github.com/smartsheet/smartsheet-sdk-tests/tree/mainline/mappings
- **Contributing Guidelines**: https://github.com/smartsheet/smartsheet-sdk-tests/blob/mainline/CONTRIBUTING.md
- **OpenAPI Spec**: https://developers.smartsheet.com/_spec/api/smartsheet/openapi.json
- **Reference Tests**: `test/mock-api/users/` directory
