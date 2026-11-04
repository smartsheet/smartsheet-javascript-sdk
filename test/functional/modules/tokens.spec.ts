import { expect, jest, describe, beforeEach, it } from '@jest/globals';
import { create } from '../../../lib/tokens/index';
import { defaultClientOptions, makeFakeRequestor, makeOptions } from './fakeRequestor';

// Pins the behavior of the tokens module as it was in JavaScript,
// before the TypeScript migration. These tests must pass unedited after conversion.
describe('tokens module behavior', () => {
  let fake: ReturnType<typeof makeFakeRequestor>;
  let clientOptions: ReturnType<typeof defaultClientOptions>;
  let api: ReturnType<typeof create>;

  const base = { url: 'token', userAgent: 'ua', baseUrl: 'https://example.com/' };

  beforeEach(() => {
    fake = makeFakeRequestor();
    clientOptions = defaultClientOptions();
    api = create(makeOptions(fake.requestor, clientOptions));
  });

  describe('getAccessToken', () => {
    it('passes exact options without accessToken, adds grant_type, passes callback', () => {
      const cb = jest.fn();
      const ret = api.getAccessToken({ queryParameters: { client_id: 'c', code: 'k', hash: 'h' } }, cb);
      const arg = fake.requestor.post.mock.calls[0][0] as Record<string, unknown>;
      expect(arg).toStrictEqual({
        ...base,
        queryParameters: { grant_type: 'authorization_code', client_id: 'c', code: 'k', hash: 'h' },
      });
      expect('accessToken' in arg).toBe(false);
      expect(fake.requestor.post.mock.calls[0][1]).toBe(cb);
      expect(ret).toBe(fake.result);
    });

    // Quirk: a caller-supplied grant_type replaces the one the SDK sets.
    it('caller grant_type wins', () => {
      api.getAccessToken({ queryParameters: { grant_type: 'x' } } as any);
      expect((fake.requestor.post.mock.calls[0][0] as any).queryParameters.grant_type).toBe('x');
    });

    // Quirk: called without options it throws synchronously instead of rejecting.
    it('throws a TypeError synchronously without options', () => {
      expect(() => api.getAccessToken(undefined as any)).toThrow(TypeError);
      expect(fake.requestor.post).not.toHaveBeenCalled();
    });
  });

  describe('refreshAccessToken', () => {
    it('passes exact options without accessToken, adds grant_type, passes callback', () => {
      const cb = jest.fn();
      const ret = api.refreshAccessToken({ queryParameters: { client_id: 'c', refresh_token: 'r', hash: 'h' } }, cb);
      const arg = fake.requestor.post.mock.calls[0][0] as Record<string, unknown>;
      expect(arg).toStrictEqual({
        ...base,
        queryParameters: { grant_type: 'refresh_token', client_id: 'c', refresh_token: 'r', hash: 'h' },
      });
      expect('accessToken' in arg).toBe(false);
      expect(fake.requestor.post.mock.calls[0][1]).toBe(cb);
      expect(ret).toBe(fake.result);
    });

    it('throws a TypeError synchronously without options', () => {
      expect(() => api.refreshAccessToken(undefined as any)).toThrow(TypeError);
      expect(fake.requestor.post).not.toHaveBeenCalled();
    });
  });

  describe('revokeAccessToken', () => {
    it('with no options uses the client access token and passes callback', () => {
      const cb = jest.fn();
      const ret = api.revokeAccessToken(undefined, cb);
      expect(fake.requestor.delete.mock.calls[0][0]).toStrictEqual({ ...base, accessToken: 'tok' });
      expect(fake.requestor.delete.mock.calls[0][1]).toBe(cb);
      expect(ret).toBe(fake.result);
    });

    it('caller accessToken and query parameters are passed through', () => {
      api.revokeAccessToken({ accessToken: 'spare', queryParameters: { deleteAllForApiClient: true } });
      expect(fake.requestor.delete.mock.calls[0][0]).toStrictEqual({
        ...base,
        accessToken: 'spare',
        queryParameters: { deleteAllForApiClient: true },
      });
    });

    it('reads clientOptions.accessToken at call time', () => {
      clientOptions.accessToken = 'new';
      api.revokeAccessToken();
      expect((fake.requestor.delete.mock.calls[0][0] as any).accessToken).toBe('new');
    });
  });

  it('create does not mutate clientOptions', () => {
    expect(clientOptions.accessToken).toBe('tok');
  });
});
