import { expect, describe, beforeEach, it } from '@jest/globals';
import { create } from '../../../lib/workspaces/index';
import type {
  CreateWorkspaceFolderResponse,
  WorkspaceListing,
  WorkspaceMetadata,
  WorkspaceResult,
} from '../../../lib/workspaces/types';
import { makeFakeRequestor, makeOptions } from './fakeRequestor';

describe('workspaces public types', () => {
  let fake: ReturnType<typeof makeFakeRequestor>;
  let api: ReturnType<typeof create>;
  const urls = (method: 'get' | 'post' | 'put' | 'delete') =>
    fake.requestor[method].mock.calls.map((call) => (call[0] as { url: string }).url);

  beforeEach(() => {
    fake = makeFakeRequestor();
    api = create(makeOptions(fake.requestor));
  });

  it('methods that address a workspace require workspaceId', () => {
    // @ts-expect-error workspaceId is required
    api.getWorkspaceMetadata({});
    // @ts-expect-error workspaceId is required
    api.getWorkspaceChildren({});
    // @ts-expect-error workspaceId is required
    api.updateWorkspace({ body: { name: 'n' } });
    // @ts-expect-error workspaceId is required
    api.deleteWorkspace({});
    // @ts-expect-error workspaceId is required
    api.copyWorkspace({ body: { newName: 'n' } });
    // @ts-expect-error workspaceId is required
    api.createFolder({ body: { name: 'n' } });
    // At runtime the missing id is silently dropped from the URL.
    expect(urls('get')).toEqual(['workspaces/metadata', 'workspaces/children']);
    expect(urls('put')).toEqual(['workspaces']);
    expect(urls('delete')).toEqual(['workspaces']);
    expect(urls('post')).toEqual(['workspaces/copy', 'workspaces/folders']);
  });

  it('create, createFolder and copy require a body with a name', () => {
    // @ts-expect-error body is required
    api.createWorkspace({});
    // @ts-expect-error name is required
    api.createWorkspace({ body: {} });
    // @ts-expect-error body is required
    api.createFolder({ workspaceId: 1 });
    // @ts-expect-error name is required
    api.createFolder({ workspaceId: 1, body: {} });
    // @ts-expect-error body is required
    api.copyWorkspace({ workspaceId: 1 });
    // @ts-expect-error newName is required
    api.copyWorkspace({ workspaceId: 1, body: {} });
    expect(urls('post')).toEqual([
      'workspaces',
      'workspaces',
      'workspaces/1/folders',
      'workspaces/1/folders',
      'workspaces/1/copy',
      'workspaces/1/copy',
    ]);
    expect(fake.requestor.post.mock.calls.map((call) => (call[0] as { body?: unknown }).body)).toEqual([
      undefined,
      {},
      undefined,
      {},
      undefined,
      {},
    ]);
  });

  it('listWorkspaces does not accept paginationType or workspaceId', () => {
    // @ts-expect-error paginationType is set by the SDK
    api.listWorkspaces({ queryParameters: { paginationType: 'x' } });
    // @ts-expect-error listWorkspaces does not address a workspace
    api.listWorkspaces({ workspaceId: 1 });
    expect((fake.requestor.get.mock.calls[0][0] as { queryParameters: object }).queryParameters).toEqual({
      paginationType: 'x',
    });
    expect(urls('get')).toEqual(['workspaces', 'workspaces/1']);
  });

  it('valid calls compile and reach the requestor', () => {
    api.listWorkspaces();
    api.listWorkspaces({ queryParameters: { maxItems: 100, lastKey: 'k' }, assumeUser: 'u@example.com' });
    api.getWorkspaceMetadata({ workspaceId: 1, queryParameters: { include: 'source', numericDates: true } });
    api.getWorkspaceChildren({ workspaceId: 1, queryParameters: { childrenResourceTypes: 'folders' } });
    api.updateWorkspace({ workspaceId: 1, body: { name: 'n' } });
    api.copyWorkspace({ workspaceId: 1, queryParameters: { include: 'data' }, body: { newName: 'n' } });
    api.deleteWorkspace({ workspaceId: 1 }, (err) => err?.statusCode);
    expect(urls('get')).toEqual(['workspaces', 'workspaces', 'workspaces/1/metadata', 'workspaces/1/children']);
    expect((fake.requestor.get.mock.calls[1][0] as { assumeUser: string }).assumeUser).toBe('u@example.com');
    expect(urls('put')).toEqual(['workspaces/1']);
    expect(urls('post')).toEqual(['workspaces/1/copy']);
    expect(urls('delete')).toEqual(['workspaces/1']);
  });

  it('response types follow the API', () => {
    const listing: WorkspaceListing = {};
    const metadata: WorkspaceMetadata = {
      id: 1,
      name: 'W',
      permalink: 'p',
      createdAt: '2026-01-01T00:00:00Z',
      modifiedAt: 1,
      accessLevel: 'OWNER',
    };
    const result: WorkspaceResult = { message: 'SUCCESS', resultCode: 0 };
    const folder: CreateWorkspaceFolderResponse = { message: 'SUCCESS', resultCode: 0, result: { id: 1, name: 'F' } };
    expect([listing, metadata, result, folder]).toHaveLength(4);
  });
});

describe('workspace metadata include=source', () => {
  it('exposes source when include=source is requested', async () => {
    const fake = makeFakeRequestor();
    (fake.requestor.get as any).mockReturnValue(
      Promise.resolve({ id: 1, name: 'W', permalink: 'p', createdAt: 'c', modifiedAt: 'm', source: { id: 999, type: 'workspace' } })
    );
    const api = create(makeOptions(fake.requestor));
    const m = await api.getWorkspaceMetadata({ workspaceId: 1, queryParameters: { include: 'source' } });
    expect(m.source?.type).toBe('workspace');
  });
});

describe('types confirmed against staging', () => {
  it('updateWorkspace requires a body (the API rejects a missing body with 400)', () => {
    const fake = makeFakeRequestor();
    const api = create(makeOptions(fake.requestor));
    // @ts-expect-error body is required
    api.updateWorkspace({ workspaceId: 1 });
    const sent = fake.requestor.put.mock.calls[0][0] as { url: string; body?: unknown };
    expect(sent.url).toBe('workspaces/1');
    expect('body' in sent).toBe(false);
  });

  it('WorkspaceMetadata.accessLevel is required (always returned by the API)', () => {
    // @ts-expect-error accessLevel is required
    const metadata: WorkspaceMetadata = { id: 1, name: 'W', permalink: 'p', createdAt: 'c', modifiedAt: 'm' };
    expect(metadata.id).toBe(1);
  });
});
