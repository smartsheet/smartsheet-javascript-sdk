import { expect, jest, describe, beforeEach, it } from '@jest/globals';
import { create } from '../../../lib/request/index';
import { makeFakeRequestor, makeOptions } from './fakeRequestor';

// Pins the behavior of the generic request module as it was in JavaScript,
// before the TypeScript migration. These tests must pass unedited after conversion.
describe('request module behavior', () => {
  let fake: ReturnType<typeof makeFakeRequestor>;
  let api: ReturnType<typeof create>;

  const clientCopy = { accessToken: 'tok', userAgent: 'ua', baseUrl: 'https://example.com/' };
  const methods = ['get', 'post', 'put', 'postFile', 'delete'] as const;

  beforeEach(() => {
    fake = makeFakeRequestor();
    api = create(makeOptions(fake.requestor));
  });

  it('exposes exactly get, post, put, postFile, delete', () => {
    expect(Object.keys(api).sort()).toEqual(['delete', 'get', 'post', 'postFile', 'put']);
  });

  it.each(methods)('%s passes exact options (no urls key) and callback', (m) => {
    const cb = jest.fn();
    api[m]({ url: 'u', body: { b: 1 } }, cb);
    expect(fake.requestor[m]).toHaveBeenCalledTimes(1);
    expect(fake.requestor[m].mock.calls[0][0]).toStrictEqual({ ...clientCopy, url: 'u', body: { b: 1 } });
    expect(fake.requestor[m].mock.calls[0][1]).toBe(cb);
  });

  it.each(methods)('%s returns requestor result unchanged', (m) => {
    expect(api[m]({ url: 'u' })).toBe(fake.result);
  });

  it.each(methods)('%s with undefined options passes only the client options', (m) => {
    api[m](undefined as any);
    expect(fake.requestor[m].mock.calls[0][0]).toStrictEqual(clientCopy);
  });

  it.each(methods)('%s honors inherited option properties', (m) => {
    api[m](Object.create({ url: 'inh' }));
    expect((fake.requestor[m].mock.calls[0][0] as any).url).toBe('inh');
  });
});
