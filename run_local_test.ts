/**
 * Quick local integration test — points at SmarGate on localhost:8081
 * which routes to local DCS on localhost:8080.
 *
 * Run:
 *   cd sdk/smartsheet-javascript-sdk
 *   npx ts-node run_local_test.ts
 */
import { createClient } from './index';

const MASKED_PLAN_ID = 1148023251199876; // raw 41878788, masked by IdMasker

const client = createClient({ accessToken: 'dummy', baseUrl: 'http://localhost:8081/2.0/' });

client.governance
  .getDataClassificationSettings({
    queryParameters: { planId: MASKED_PLAN_ID },
    customProperties: {
      // Internal headers that SmarGate's auth proxy normally sets.
      // x-smar-sc-actor-org-id / x-smar-sc-actor-id are required by DCS.
      // X-Client-DN satisfies DCS's mTLS CN check (MtlsCallerAspect) in local mode.
      'x-smar-sc-actor-org-id': '1001',
      'x-smar-sc-actor-id': '9999',
      'X-Client-DN': 'CN=api.governance.a.dev.smar.cloud',
    },
  })
  .then((settings) => console.log(JSON.stringify(settings, null, 2)))
  .catch((err) => console.error('Error:', err.message ?? err));
