import { expect, jest, describe, beforeEach, it } from '@jest/globals';
import { create } from '../../../lib/server/index';
import { apiUrls } from '../../../lib/utils/apis';
import { makeFakeRequestor, makeOptions } from './fakeRequestor';

// Pins current behavior, including known quirks.
describe('server module behavior', () => {
  let fake: ReturnType<typeof makeFakeRequestor>;
  let api: ReturnType<typeof create>;

  const base = {
    url: 'serverinfo',
    urls: apiUrls,
    accessToken: 'tok',
    userAgent: 'ua',
    baseUrl: 'https://example.com/',
  };

  beforeEach(() => {
    fake = makeFakeRequestor();
    api = create(makeOptions(fake.requestor));
  });

  it('getInfo passes exact options and callback', () => {
    const cb = jest.fn();
    api.getInfo({ customProperties: { a: 1 } }, cb);
    expect(fake.requestor.get).toHaveBeenCalledTimes(1);
    expect(fake.requestor.get.mock.calls[0][0]).toStrictEqual({ ...base, customProperties: { a: 1 } });
    expect(fake.requestor.get.mock.calls[0][1]).toBe(cb);
  });

  it('getInfo with no arguments', () => {
    api.getInfo();
    expect(fake.requestor.get.mock.calls[0][0]).toStrictEqual(base);
    expect(fake.requestor.get.mock.calls[0][1]).toBeUndefined();
  });

  it('returns requestor result unchanged', () => {
    expect(api.getInfo()).toBe(fake.result);
  });

  it('caller url overrides', () => {
    api.getInfo({ url: 'x' } as any);
    expect((fake.requestor.get.mock.calls[0][0] as any).url).toBe('x');
  });

  it('honors inherited option properties', () => {
    api.getInfo(Object.create({ queryParameters: { q: 1 } }));
    expect((fake.requestor.get.mock.calls[0][0] as any).queryParameters).toEqual({ q: 1 });
  });

  it('undefined accessToken is passed as a key', () => {
    const fake2 = makeFakeRequestor();
    const api2 = create(
      makeOptions(fake2.requestor, { accessToken: undefined, userAgent: undefined, baseUrl: undefined })
    );
    api2.getInfo();
    expect(fake2.requestor.get.mock.calls[0][0]).toStrictEqual({
      url: 'serverinfo',
      urls: apiUrls,
      accessToken: undefined,
      userAgent: undefined,
      baseUrl: undefined,
    });
  });
});
