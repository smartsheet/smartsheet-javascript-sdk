# Endpoint Definition Rules

## Overview

This document defines the coding standards and best practices for creating endpoint implementations in the Smartsheet JavaScript SDK. All endpoint groups must follow these conventions to ensure consistency, maintainability, and alignment with the Smartsheet REST API.

## Directory Structure

### Location
- All endpoint groups MUST be located in `lib/{{endpoint_group}}/`
- Example: [`lib/users/`](/lib/users/index.ts), [`lib/folders/`](/lib/folders/index.ts), [`lib/webhooks/`](/lib/webhooks/index.ts)

### Required Files
Each endpoint folder MUST contain exactly two files:

1. **[`index.ts`](/lib/users/index.ts)** - Implementation file containing the endpoint logic
2. **[`types.ts`](/lib/users/types.ts)** - Type definitions with detailed JSDoc documentation

## Type Definitions (`types.ts`)

### File Structure

Type definition files MUST follow this structure:

```typescript
// 1. Import common types from lib/types
import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';
import type { BaseResponseStatus } from '../types/BaseResponseStatus';

// 2. API Interface definition
export interface {{EndpointGroup}}Api {
  // Method definitions with full JSDoc
}

// 3. Shared types and enums
export enum {{EnumName}} { }
export interface {{SharedType}} { }

// 4. Request/Response types grouped by operation
// ============================================================================
// {{Operation Name}}
// ============================================================================
export interface {{OperationName}}Options { }
export interface {{OperationName}}Response { }
export interface {{OperationName}}QueryParameters { }
export interface {{OperationName}}Body { }
```

### API Interface Requirements

The main API interface MUST:

1. **Export a named interface** following the pattern `{{EndpointGroup}}Api`
   - Example: [`UsersApi`](/lib/users/types.ts), [`FoldersApi`](/lib/folders/types.ts), [`WebhooksApi`](/lib/webhooks/types.ts)

2. **Document each method** with complete JSDoc including:
   - Summary description
   - `@param` tags for all parameters with type links
   - `@returns` tag with type link
   - `@remarks` section containing:
     - "Who can use this operation" (permissions required)
     - REST API method mapping (e.g., `GET /users/{userId}`)
   - `@example` section with realistic usage code

3. **Use consistent method signatures**:
   ```typescript
   methodName: (
     options: {{MethodName}}Options,
     callback?: RequestCallback<{{MethodName}}Response>
   ) => Promise<{{MethodName}}Response>;
   ```

### JSDoc Documentation Standards

#### Method Documentation Template

```typescript
/**
 * Brief description of what the method does.
 *
 * Additional context or important details about the operation.
 *
 * @param options - {@link {{MethodName}}Options} - Configuration options for the request
 * @param callback - {@link RequestCallback}\<{@link {{MethodName}}Response}\> - Optional callback function
 * @returns Promise\<{@link {{MethodName}}Response}\>
 *
 * @remarks
 * **Who can use this operation:**
 * - **Permissions:** {{Required Permission Level}}
 *
 * **Additional notes:**
 * - Any important behavioral notes
 * - Edge cases or special conditions
 *
 * It mirrors to the following Smartsheet REST API method: `{{HTTP_METHOD}} {{API_PATH}}`
 *
 * @example
 * ```typescript
 * const result = await client.{{endpointGroup}}.{{methodName}}({
 *   // Realistic example parameters
 * });
 * ```
 */
```

#### Type Documentation Standards

All interface properties MUST include JSDoc comments:

```typescript
export interface UserProfile {
  /**
   * User Id.
   */
  id: number;

  /**
   * User's email address.
   */
  email: string;

  /**
   * User's status.
   * @see UserStatus
   */
  status?: UserStatus;
}
```

### Type Naming Conventions

1. **Options Types**: `{{MethodName}}Options`
   - Extends [`RequestOptions<QueryParams, Body>`](/lib/types/RequestOptions.ts) when applicable
   - Example: [`GetUserOptions`](/lib/users/types.ts), [`UpdateUserOptions`](/lib/users/types.ts)

2. **Response Types**: `{{MethodName}}Response`
   - Example: [`GetUserResponse`](/lib/users/types.ts), [`ListUsersResponse`](/lib/users/types.ts)

3. **Query Parameters**: `{{MethodName}}QueryParameters`
   - Example: [`ListUsersQueryParameters`](/lib/users/types.ts)

4. **Request Body**: `{{MethodName}}Body`
   - Example: [`AddUserBody`](/lib/users/types.ts), [`UpdateUserBody`](/lib/users/types.ts)

5. **Shared Types**: Descriptive names without method prefix
   - Example: [`UserProfile`](/lib/users/types.ts), [`Account`](/lib/users/types.ts), [`ProfileImage`](/lib/users/types.ts)

6. **Enums**: PascalCase with descriptive names
   - Example: [`UserStatus`](/lib/users/types.ts), [`SeatTypes`](/lib/users/types.ts)

### OpenAPI Spec Compliance

**CRITICAL**: All type definitions MUST be validated against the OpenAPI specification:

- **Spec URL**: https://developers.smartsheet.com/_spec/api/smartsheet/openapi.json
- **Validation Requirements**:
  - Property names must match spec exactly
  - Property types must match spec types
  - Required vs optional properties must match spec
  - Enum values must match spec exactly
  - Descriptions should align with spec documentation

### Reusing Common Types

ALWAYS reuse types from [`lib/types/`](/lib/types/) when applicable:

```typescript
// Common types to reuse:
import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';
import type { BaseResponseStatus } from '../types/BaseResponseStatus';
import type { CreateOptions } from '../types/CreateOptions';
import type { ApiAccessLevel } from '../types/ApiAccessLevel';
```

Do NOT duplicate these types in endpoint-specific type files.

## Implementation (`index.ts`)

### File Structure

Implementation files MUST follow this structure:

```typescript
// 1. Import common types
import type { BaseResponseStatus } from '../types/BaseResponseStatus';
import type { CreateOptions } from '../types/CreateOptions';
import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';

// 2. Import endpoint-specific types
import type {
  {{EndpointGroup}}Api,
  // All other types used in implementation
} from './types';

// 3. Import sub-modules if any
import * as subModule from './submodule';
import type { SubModuleApi } from './submodule_types';

// 4. Export create function
export function create(options: CreateOptions): {{EndpointGroup}}Api {
  // Implementation
}
```

### Create Function Pattern

The [`create()`](/lib/users/index.ts) function MUST:

1. **Accept [`CreateOptions`](/lib/types/CreateOptions.ts)** parameter
2. **Return the API interface type**
3. **Extract requestor and options**:
   ```typescript
   const requestor = options.requestor;
   const optionsToSend = {
     url: options.apiUrls.{{endpointGroup}},
     ...options.clientOptions,
   };
   ```

4. **Define all endpoint methods** as const functions
5. **Return an object** implementing the API interface

### Method Implementation Pattern

Each method MUST follow this pattern:

```typescript
const methodName = (
  methodOptions: MethodNameOptions,
  callback?: RequestCallback<MethodNameResponse>
) => {
  // 1. Build URL if needed (for parameterized endpoints)
  const urlOptions = { url: buildMethodUrl(methodOptions) };

  // 2. Merge options
  const requestOptions = { ...optionsToSend, ...urlOptions, ...methodOptions };

  // 3. Call appropriate requestor method
  return requestor.get(requestOptions, callback);
  // or .post(), .put(), .delete(), .postFile()
};
```

### URL Building Functions

For parameterized URLs, create helper functions:

```typescript
const buildMethodUrl = (urlOptions: { userId: number }) =>
  options.apiUrls.users + '/' + urlOptions.userId;

const buildComplexUrl = (urlOptions: { userId: number; planId: number }) =>
  options.apiUrls.users + '/' + urlOptions.userId + '/plans/' + urlOptions.planId;
```

See examples in [`lib/users/index.ts`](/lib/users/index.ts).

### Return Object

The final return object MUST:

1. **Implement the API interface completely**
2. **Use consistent property names** matching the interface
3. **Include sub-module APIs** if applicable:
   ```typescript
   return {
     method1: method1,
     method2: method2,
     // ... all methods
   } as {{EndpointGroup}}Api;

   // Or with sub-modules:
   return {
     ...mainObject,
     ...subModule.create(options)
   } as {{EndpointGroup}}Api & SubModuleApi;
   ```

## SmartsheetClient Integration

### Adding to Client Type

When creating a new endpoint group, you MUST add it to [`lib/types/SmartsheetClient.ts`](/lib/types/SmartsheetClient.ts):

```typescript
export interface SmartsheetClient {
  // ... existing endpoints
  {{endpointGroup}}: {{EndpointGroup}}Api;
  // ... other endpoints
}
```

**Example**:
```typescript
import type { UsersApi } from '../users/types';
import type { AlternateEmailsApi } from '../users/alternateemails_types';

export interface SmartsheetClient {
  users: UsersApi & AlternateEmailsApi;
  folders: FoldersApi;
  webhooks: WebhooksApi;
}
```

## Sub-Modules

For endpoint groups with sub-resources (e.g., [`users/alternateemails`](/lib/users/alternateemails.ts)):

### File Structure
- Main: [`lib/{{endpoint}}/index.ts`](/lib/users/index.ts) and [`lib/{{endpoint}}/types.ts`](/lib/users/types.ts)
- Sub: [`lib/{{endpoint}}/{{subresource}}.ts`](/lib/users/alternateemails.ts) and [`lib/{{endpoint}}/{{subresource}}_types.ts`](/lib/users/alternateemails_types.ts)

### Integration Pattern

In main [`index.ts`](/lib/users/index.ts):
```typescript
import * as subResource from './subresource';
import type { SubResourceApi } from './subresource_types';

export function create(options: CreateOptions): MainApi & SubResourceApi {
  // ... main implementation

  return {
    ...mainObject,
    ...subResource.create(options)
  } as MainApi & SubResourceApi;
}
```

In [`SmartsheetClient.ts`](/lib/types/SmartsheetClient.ts):
```typescript
{{endpoint}}: {{Endpoint}}Api & {{SubResource}}Api;
```

## Code Quality Standards

### TypeScript Best Practices

1. **Use explicit types** - No implicit `any`
2. **Use `type` imports** - `import type { ... }`
3. **Use optional chaining** - For optional properties
4. **Use const assertions** - For literal types when appropriate

### Consistency Requirements

1. **Naming**: Follow established patterns exactly
2. **Formatting**: Use Prettier configuration
3. **Imports**: Group and order consistently
4. **Comments**: Use JSDoc format exclusively

### Error Handling

Methods should rely on the requestor's error handling. Do NOT add try-catch blocks unless specific error transformation is needed.

## Testing Requirements

Each endpoint group MUST have corresponding tests in `test/mock-api/{{endpoint}}/`:

1. **Create test constants file**: [`common_test_constants.ts`](/test/mock-api/users/common_test_constants.ts)
2. **Create test files** for each operation
3. **Follow existing test patterns** from [`test/mock-api/users/`](/test/mock-api/users/)

## Examples

### Reference Implementation

Use [`lib/users/index.ts`](/lib/users/index.ts) and [`lib/users/types.ts`](/lib/users/types.ts) as the canonical examples for:
- File structure
- Documentation style
- Implementation patterns
- Type organization
- Sub-module integration

### Quick Checklist

Before submitting endpoint code, verify:

- [ ] Files are in `lib/{{endpoint_group}}/` directory
- [ ] Both [`index.ts`](/lib/users/index.ts) and [`types.ts`](/lib/users/types.ts) exist
- [ ] API interface is exported from [`types.ts`](/lib/users/types.ts)
- [ ] All methods have complete JSDoc documentation
- [ ] Types validated against OpenAPI spec
- [ ] Common types from [`lib/types`](/lib/types/) are reused
- [ ] Entry added to [`lib/types/SmartsheetClient.ts`](/lib/types/SmartsheetClient.ts)
- [ ] Implementation follows the [`create()`](/lib/users/index.ts) function pattern
- [ ] URL building functions for parameterized endpoints
- [ ] Tests created in `test/mock-api/{{endpoint}}/`
- [ ] Code passes linting and type checking

## Additional Resources

- **OpenAPI Spec**: https://developers.smartsheet.com/_spec/api/smartsheet/openapi.json
- **Reference Implementation**: [`lib/users/`](/lib/users/) directory
- **Common Types**: [`lib/types/`](/lib/types/) directory
- **Test Examples**: [`test/mock-api/users/`](/test/mock-api/users/) directory
