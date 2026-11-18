import { expect, describe, it } from '@jest/globals';
import { create } from '../../../lib/workspaces/index';
import type {
  CreateWorkspaceFolderResponse,
  WorkspaceListing,
  WorkspaceMetadata,
  WorkspaceResult,
} from '../../../lib/workspaces/types';
import { makeFakeRequestor, makeOptions } from './fakeRequestor';

describe('workspaces public types', () => {
  const fake = makeFakeRequestor();
  const api = create(makeOptions(fake.requestor));

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
    expect(fake.requestor.get).toHaveBeenCalled();
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
    expect(fake.requestor.post).toHaveBeenCalled();
  });

  it('listWorkspaces does not accept paginationType or workspaceId', () => {
    // @ts-expect-error paginationType is set by the SDK
    api.listWorkspaces({ queryParameters: { paginationType: 'x' } });
    // @ts-expect-error listWorkspaces does not address a workspace
    api.listWorkspaces({ workspaceId: 1 });
    expect(fake.requestor.get).toHaveBeenCalled();
  });

  it('valid calls compile and reach the requestor', () => {
    const before = fake.requestor.get.mock.calls.length;
    api.listWorkspaces();
    api.listWorkspaces({ queryParameters: { maxItems: 100, lastKey: 'k' }, assumeUser: 'u@example.com' });
    api.getWorkspaceMetadata({ workspaceId: 1, queryParameters: { include: 'source', numericDates: true } });
    api.getWorkspaceChildren({ workspaceId: 1, queryParameters: { childrenResourceTypes: 'folders' } });
    expect(fake.requestor.get.mock.calls.length - before).toBe(4);
    api.updateWorkspace({ workspaceId: 1, body: { name: 'n' } });
    api.copyWorkspace({ workspaceId: 1, queryParameters: { include: 'data' }, body: { newName: 'n' } });
    api.deleteWorkspace({ workspaceId: 1 }, (err) => err?.statusCode);
    expect(fake.requestor.delete).toHaveBeenCalled();
  });

  it('response types follow the API', () => {
    const listing: WorkspaceListing = {};
    const metadata: WorkspaceMetadata = {
      id: 1,
      name: 'W',
      permalink: 'p',
      createdAt: '2026-01-01T00:00:00Z',
      modifiedAt: 1,
    };
    const result: WorkspaceResult = { message: 'SUCCESS', resultCode: 0 };
    const folder: CreateWorkspaceFolderResponse = { message: 'SUCCESS', resultCode: 0, result: { id: 1, name: 'F' } };
    expect([listing, metadata, result, folder]).toHaveLength(4);
  });
});
