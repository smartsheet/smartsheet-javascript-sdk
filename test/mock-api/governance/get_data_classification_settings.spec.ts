import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';

const TEST_PLAN_ID = 41878788;
const TEST_ORG_ID = 1244212;

describe('Governance - getDataClassificationSettings endpoint tests', () => {
  const client = createClient();

  it('getDataClassificationSettings generated url is correct', async () => {
    const requestId = crypto.randomUUID();
    await client.governance.getDataClassificationSettings({
      queryParameters: { planId: TEST_PLAN_ID },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/governance/get-data-classification-settings/all-response-body-properties',
      },
    });
    const matchedRequest = await findWireMockRequest(requestId);
    const parsedUrl = new URL(matchedRequest.absoluteUrl);
    expect(parsedUrl.pathname).toEqual('/2.0/governance/data-classification/settings');
    expect(matchedRequest.method).toEqual('GET');
    expect(Object.fromEntries(parsedUrl.searchParams)).toEqual({ planId: String(TEST_PLAN_ID) });
  });

  it('getDataClassificationSettings all response body properties', async () => {
    const requestId = crypto.randomUUID();
    const response = await client.governance.getDataClassificationSettings({
      queryParameters: { planId: TEST_PLAN_ID },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/governance/get-data-classification-settings/all-response-body-properties',
      },
    });
    const matchedRequest = await findWireMockRequest(requestId);
    expect(matchedRequest.body).toEqual('');
    // CUSTOM mode: only labelApprovers, no top-level approvers.
    expect(response).toEqual({
      orgId: TEST_ORG_ID,
      planId: TEST_PLAN_ID,
      isDisabled: false,
      guidelinesUrl: 'https://wiki.example.com/classification-guide',
      allowManualChange: true,
      labels: [
        {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          name: 'Confidential',
          description: 'Highly sensitive information',
          color: '#FFE0E3',
          sensitivityOrder: 1,
          isDefault: false,
        },
        {
          id: '4aa85f64-5717-4562-b3fc-2c963f66afa7',
          name: 'Internal',
          description: 'For internal use only',
          color: '#E0F0FF',
          sensitivityOrder: 2,
          isDefault: true,
        },
      ],
      downgradeApprovalSettings: {
        mode: 'CUSTOM',
        labelApprovers: [
          {
            labelId: '4aa85f64-5717-4562-b3fc-2c963f66afa7',
            approvers: [
              { type: 'USERS', ids: [7001] },
              { type: 'WORKSPACE_ADMINS', ids: [] },
            ],
          },
        ],
      },
    });
  });

  it('getDataClassificationSettings required response body properties', async () => {
    const requestId = crypto.randomUUID();
    const response = await client.governance.getDataClassificationSettings({
      queryParameters: { planId: TEST_PLAN_ID },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/governance/get-data-classification-settings/required-response-body-properties',
      },
    });
    const matchedRequest = await findWireMockRequest(requestId);
    expect(matchedRequest.body).toEqual('');
    // NONE mode: no approvers, no labelApprovers.
    expect(response).toEqual({
      orgId: TEST_ORG_ID,
      planId: TEST_PLAN_ID,
      isDisabled: false,
      labels: [
        {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          name: 'Confidential',
          color: '#FFE0E3',
          sensitivityOrder: 1,
          isDefault: false,
        },
      ],
      downgradeApprovalSettings: { mode: 'NONE' },
    });
  });

  it('getDataClassificationSettings disabled plan', async () => {
    const requestId = crypto.randomUUID();
    const response = await client.governance.getDataClassificationSettings({
      queryParameters: { planId: TEST_PLAN_ID },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/governance/get-data-classification-settings/disabled-plan',
      },
    });
    expect(response).toEqual({
      orgId: TEST_ORG_ID,
      planId: TEST_PLAN_ID,
      isDisabled: true,
      labels: [],
      downgradeApprovalSettings: { mode: 'NONE' },
    });
  });

  it('getDataClassificationSettings downgrade approval mode APPROVAL_NEEDED', async () => {
    const requestId = crypto.randomUUID();
    const response = await client.governance.getDataClassificationSettings({
      queryParameters: { planId: TEST_PLAN_ID },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/governance/get-data-classification-settings/downgrade-approval-mode-approval-needed',
      },
    });
    // APPROVAL_NEEDED: top-level approvers list, no labelApprovers.
    expect(response).toEqual({
      orgId: TEST_ORG_ID,
      planId: TEST_PLAN_ID,
      isDisabled: false,
      allowManualChange: true,
      labels: [
        {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          name: 'Confidential',
          color: '#FFE0E3',
          sensitivityOrder: 1,
          isDefault: false,
        },
      ],
      downgradeApprovalSettings: {
        mode: 'APPROVAL_NEEDED',
        approvers: [
          { type: 'GROUPS', ids: [5001, 5002] },
          { type: 'USERS', ids: [7001] },
        ],
      },
    });
  });

  it('getDataClassificationSettings error 400 response', async () => {
    const requestId = crypto.randomUUID();
    try {
      await client.governance.getDataClassificationSettings({
        queryParameters: { planId: TEST_PLAN_ID },
        customProperties: { 'x-request-id': requestId, 'x-test-name': '/errors/400-response' },
      });
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Malformed Request');
    }
  });

  it('getDataClassificationSettings error 403 response', async () => {
    const requestId = crypto.randomUUID();
    try {
      await client.governance.getDataClassificationSettings({
        queryParameters: { planId: TEST_PLAN_ID },
        customProperties: { 'x-request-id': requestId, 'x-test-name': '/errors/403-response' },
      });
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.statusCode).toBe(403);
      expect(error.message).toBe('You are not authorized to perform this action.');
    }
  });

  it('getDataClassificationSettings error 500 response', async () => {
    const requestId = crypto.randomUUID();
    try {
      await client.governance.getDataClassificationSettings({
        queryParameters: { planId: TEST_PLAN_ID },
        customProperties: { 'x-request-id': requestId, 'x-test-name': '/errors/500-response' },
      });
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('Internal Server Error');
    }
  });
});
