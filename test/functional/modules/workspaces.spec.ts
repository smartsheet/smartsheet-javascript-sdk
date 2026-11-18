import { expect, jest, describe, beforeEach, it } from '@jest/globals';
import { create } from '../../../lib/workspaces/index';
import { makeFakeRequestor, makeOptions } from './fakeRequestor';

// Pins current behavior, including known quirks.
describe('workspaces module behavior', () => {
  let fake: ReturnType<typeof makeFakeRequestor>;
  let api: ReturnType<typeof create>;

  const base = { url: 'workspaces', accessToken: 'tok', userAgent: 'ua', baseUrl: 'https://example.com/' };

  beforeEach(() => {
    fake = makeFakeRequestor();
    api = create(makeOptions(fake.requestor));
  });

  type Cb = (...args: unknown[]) => void;
  const cases: {
    name: string;
    method: 'get' | 'post' | 'put' | 'delete';
    call: (a: ReturnType<typeof create>, cb: Cb) => unknown;
    expected: Record<string, unknown>;
  }[] = [
    {
      name: 'getWorkspaceMetadata',
      method: 'get',
      call: (a, cb) => a.getWorkspaceMetadata({ workspaceId: 7, queryParameters: { include: 'source' } }, cb),
      expected: { ...base, url: 'workspaces/7/metadata', workspaceId: 7, queryParameters: { include: 'source' } },
    },
    {
      name: 'getWorkspaceChildren',
      method: 'get',
      call: (a, cb) => a.getWorkspaceChildren({ workspaceId: 7, queryParameters: { maxItems: 100 } }, cb),
      expected: { ...base, url: 'workspaces/7/children', workspaceId: 7, queryParameters: { maxItems: 100 } },
    },
    {
      name: 'createFolder',
      method: 'post',
      call: (a, cb) => a.createFolder({ workspaceId: 7, body: { name: 'F' } }, cb),
      expected: { ...base, url: 'workspaces/7/folders', workspaceId: 7, body: { name: 'F' } },
    },
    {
      name: 'updateWorkspace',
      method: 'put',
      call: (a, cb) => a.updateWorkspace({ workspaceId: 7, body: { name: 'R' } }, cb),
      expected: { ...base, url: 'workspaces/7', workspaceId: 7, body: { name: 'R' } },
    },
    {
      name: 'deleteWorkspace',
      method: 'delete',
      call: (a, cb) => a.deleteWorkspace({ workspaceId: 7 }, cb),
      expected: { ...base, url: 'workspaces/7', workspaceId: 7 },
    },
    {
      name: 'copyWorkspace',
      method: 'post',
      call: (a, cb) =>
        a.copyWorkspace({ workspaceId: 7, queryParameters: { include: 'data' }, body: { newName: 'C' } }, cb),
      expected: {
        ...base,
        url: 'workspaces/7/copy',
        workspaceId: 7,
        queryParameters: { include: 'data' },
        body: { newName: 'C' },
      },
    },
    {
      name: 'createWorkspace',
      method: 'post',
      call: (a, cb) => a.createWorkspace({ body: { name: 'W' } }, cb),
      expected: { ...base, url: 'workspaces', body: { name: 'W' } },
    },
    {
      name: 'listWorkspaces',
      method: 'get',
      call: (a, cb) => a.listWorkspaces({ queryParameters: { maxItems: 100 } }, cb),
      expected: { ...base, url: 'workspaces', queryParameters: { paginationType: 'token', maxItems: 100 } },
    },
  ];

  it.each(cases)('$name passes exact options and callback', ({ method, call, expected }) => {
    const cb = jest.fn();
    call(api, cb);
    expect(fake.requestor[method]).toHaveBeenCalledTimes(1);
    expect(fake.requestor[method].mock.calls[0][0]).toStrictEqual(expected);
    expect(fake.requestor[method].mock.calls[0][1]).toBe(cb);
  });

  it.each(cases)('$name returns the requestor result unchanged', ({ call }) => {
    expect(call(api, jest.fn())).toBe(fake.result);
  });

  it('exposes exactly the eight methods', () => {
    expect(Object.keys(api).sort()).toEqual([
      'copyWorkspace',
      'createFolder',
      'createWorkspace',
      'deleteWorkspace',
      'getWorkspaceChildren',
      'getWorkspaceMetadata',
      'listWorkspaces',
      'updateWorkspace',
    ]);
  });

  describe('listWorkspaces', () => {
    it('with no arguments adds paginationType token', () => {
      api.listWorkspaces();
      expect(fake.requestor.get.mock.calls[0][0]).toStrictEqual({
        ...base,
        queryParameters: { paginationType: 'token' },
      });
      expect(fake.requestor.get.mock.calls[0][1]).toBeUndefined();
    });

    it("mutates the caller's options object", () => {
      const opts = { queryParameters: { maxItems: 100 } };
      api.listWorkspaces(opts);
      expect(opts.queryParameters).toEqual({ paginationType: 'token', maxItems: 100 });
    });

    it('caller paginationType wins over the SDK value', () => {
      api.listWorkspaces({ queryParameters: { paginationType: 'x' } } as any);
      expect((fake.requestor.get.mock.calls[0][0] as any).queryParameters.paginationType).toBe('x');
    });

    it('a workspaceId changes the URL', () => {
      api.listWorkspaces({ workspaceId: 7 } as any);
      expect((fake.requestor.get.mock.calls[0][0] as any).url).toBe('workspaces/7');
    });
  });

  it('createWorkspace with a workspaceId changes the URL', () => {
    api.createWorkspace({ workspaceId: 7, body: { name: 'W' } } as any);
    expect((fake.requestor.post.mock.calls[0][0] as any).url).toBe('workspaces/7');
  });

  it.each([undefined, 0, ''])('falsy workspaceId %p is dropped from the URL', (workspaceId) => {
    api.getWorkspaceMetadata({ workspaceId } as any, jest.fn());
    expect((fake.requestor.get.mock.calls[0][0] as any).url).toBe('workspaces/metadata');
  });

  it('caller url overrides', () => {
    api.getWorkspaceMetadata({ workspaceId: 7, url: 'x' } as any, jest.fn());
    expect((fake.requestor.get.mock.calls[0][0] as any).url).toBe('x');
  });

  it.each(cases)('$name honors inherited option properties', ({ name, method }) => {
    (api as any)[name](Object.create({ workspaceId: 7, queryParameters: { inherited: 1 } }), jest.fn());
    expect((fake.requestor[method].mock.calls[0][0] as any).queryParameters).toMatchObject({ inherited: 1 });
  });

  it('inherited workspaceId is used in the URL', () => {
    api.getWorkspaceChildren(Object.create({ workspaceId: 7, queryParameters: { maxItems: 100 } }), jest.fn());
    const sent = fake.requestor.get.mock.calls[0][0] as any;
    expect(sent.url).toBe('workspaces/7/children');
    expect(sent.queryParameters).toEqual({ maxItems: 100 });
  });

  it('undefined accessToken is passed as a key', () => {
    const fake2 = makeFakeRequestor();
    const api2 = create(
      makeOptions(fake2.requestor, { accessToken: undefined, userAgent: undefined, baseUrl: undefined })
    );
    api2.deleteWorkspace({ workspaceId: 7 });
    expect(fake2.requestor.delete.mock.calls[0][0]).toStrictEqual({
      url: 'workspaces/7',
      accessToken: undefined,
      userAgent: undefined,
      baseUrl: undefined,
      workspaceId: 7,
    });
  });
});
