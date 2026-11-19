import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals';
import { create } from '../../../lib/home/index';
import { makeFakeRequestor, makeOptions } from './fakeRequestor';

// Pins current behavior, including known quirks.
describe('home module behavior', () => {
  let fake: ReturnType<typeof makeFakeRequestor>;
  let api: ReturnType<typeof create>;
  let warn: ReturnType<typeof jest.spyOn>;

  const client = { accessToken: 'tok', userAgent: 'ua', baseUrl: 'https://example.com/' };

  beforeEach(() => {
    fake = makeFakeRequestor();
    api = create(makeOptions(fake.requestor));
    warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warn.mockRestore();
  });

  describe('listContents', () => {
    it('passes exact options and callback, returns requestor result', () => {
      const cb = jest.fn();
      const ret = api.listContents({ customProperties: { a: 1 } }, cb);
      expect(fake.requestor.get.mock.calls[0][0]).toStrictEqual({ url: 'home', ...client, customProperties: { a: 1 } });
      expect(fake.requestor.get.mock.calls[0][1]).toBe(cb);
      expect(ret).toBe(fake.result);
    });

    it('warns exactly once', () => {
      api.listContents();
      expect(warn.mock.calls).toEqual([['DEPRECATED: Home.listContents is deprecated.']]);
    });

    it('works with undefined options', () => {
      api.listContents();
      expect(fake.requestor.get.mock.calls[0][0]).toStrictEqual({ url: 'home', ...client });
    });
  });

  describe('listFolders', () => {
    it('passes exact options and callback, returns requestor result', () => {
      const cb = jest.fn();
      const ret = api.listFolders({ queryParameters: { pageSize: 10 } }, cb);
      expect(fake.requestor.get.mock.calls[0][0]).toStrictEqual({
        url: 'home/folders',
        ...client,
        queryParameters: { pageSize: 10 },
      });
      expect(fake.requestor.get.mock.calls[0][1]).toBe(cb);
      expect(ret).toBe(fake.result);
    });

    // Quirk: listFolders delegates to listContents, so it logs two warnings.
    it('warns twice, listFolders then listContents', () => {
      api.listFolders();
      expect(warn.mock.calls).toEqual([
        ['DEPRECATED: Home.listFolders is deprecated.'],
        ['DEPRECATED: Home.listContents is deprecated.'],
      ]);
    });

    it('caller url overrides', () => {
      api.listFolders({ url: 'x' } as any);
      expect((fake.requestor.get.mock.calls[0][0] as any).url).toBe('x');
    });

    it('works with undefined options', () => {
      api.listFolders();
      expect(fake.requestor.get.mock.calls[0][0]).toStrictEqual({ url: 'home/folders', ...client });
    });
  });

  describe('createFolder', () => {
    it('passes exact options and callback, returns requestor result', () => {
      const cb = jest.fn();
      const ret = api.createFolder({ body: { name: 'F' } }, cb);
      expect(fake.requestor.post.mock.calls[0][0]).toStrictEqual({
        url: 'home/folders',
        ...client,
        body: { name: 'F' },
      });
      expect(fake.requestor.post.mock.calls[0][1]).toBe(cb);
      expect(ret).toBe(fake.result);
    });

    it('warns exactly once', () => {
      api.createFolder({ body: { name: 'F' } });
      expect(warn.mock.calls).toEqual([['DEPRECATED: Home.createFolder is deprecated.']]);
    });

    it('caller url overrides', () => {
      api.createFolder({ url: 'x', body: { name: 'F' } } as any);
      expect((fake.requestor.post.mock.calls[0][0] as any).url).toBe('x');
    });

    it('works with undefined options', () => {
      api.createFolder(undefined as any);
      expect(fake.requestor.post.mock.calls[0][0]).toStrictEqual({ url: 'home/folders', ...client });
    });
  });
});
