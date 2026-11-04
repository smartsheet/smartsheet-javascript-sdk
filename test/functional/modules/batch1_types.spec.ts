import { expect, describe, it } from '@jest/globals';
import { create as createTokens } from '../../../lib/tokens/index';
import { create as createRequest } from '../../../lib/request/index';
import { makeFakeRequestor, makeOptions } from './fakeRequestor';

// Valid API calls that the public types must accept (type-checked by ts-jest and tsc).
describe('batch 1 public types accept valid calls', () => {
  it('getAccessToken accepts client_secret instead of hash, and contentType', () => {
    const fake = makeFakeRequestor();
    const api = createTokens(makeOptions(fake.requestor));
    api.getAccessToken({
      queryParameters: { client_id: 'c', code: 'k', client_secret: 's' },
      contentType: 'application/x-www-form-urlencoded',
    });
    expect((fake.requestor.post.mock.calls[0][0] as any).contentType).toBe('application/x-www-form-urlencoded');
  });

  it('refreshAccessToken accepts client_secret instead of hash, and contentType', () => {
    const fake = makeFakeRequestor();
    const api = createTokens(makeOptions(fake.requestor));
    api.refreshAccessToken({
      queryParameters: { client_id: 'c', refresh_token: 'r', client_secret: 's' },
      contentType: 'application/x-www-form-urlencoded',
    });
    expect((fake.requestor.post.mock.calls[0][0] as any).queryParameters.client_secret).toBe('s');
  });

  it('request methods accept interface-typed query parameters', () => {
    interface QP {
      include: string;
    }
    const qp: QP = { include: 'ownerInfo' };
    const fake = makeFakeRequestor();
    const api = createRequest(makeOptions(fake.requestor));
    api.get({ url: 'sheets', queryParameters: qp });
    expect((fake.requestor.get.mock.calls[0][0] as any).queryParameters).toEqual(qp);
  });
});
