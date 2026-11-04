import { jest } from '@jest/globals';
import { apiUrls } from '../../../lib/utils/apis';

type Method = 'get' | 'post' | 'put' | 'postFile' | 'delete';

/**
 * A requestor whose methods record their arguments and all return the same
 * sentinel object, so tests can assert the exact options a module passes on
 * and that the module returns the requestor's result unchanged.
 */
export function makeFakeRequestor() {
  const result = { sentinel: true };
  const make = () => jest.fn((_options: unknown, _callback?: unknown) => result);
  const requestor: Record<Method, ReturnType<typeof make>> = {
    get: make(),
    post: make(),
    put: make(),
    postFile: make(),
    delete: make(),
  };
  return { requestor, result };
}

export const defaultClientOptions = () => ({
  accessToken: 'tok' as string | undefined,
  userAgent: 'ua' as string | undefined,
  baseUrl: 'https://example.com/' as string | undefined,
});

export function makeOptions(
  requestor: unknown,
  clientOptions: ReturnType<typeof defaultClientOptions> = defaultClientOptions()
) {
  return { apiUrls, requestor, clientOptions };
}
