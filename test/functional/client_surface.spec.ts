import * as fs from 'fs';
import * as path from 'path';
import * as smartsheet from '@smartsheet';
import { expect, describe, it } from '@jest/globals';

// Fails if a public client method is dropped or renamed.
const fixture: Record<string, string[]> = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'test/functional/fixtures/client-surface.json'), 'utf8')
);

describe('Client method surface', () => {
  const client = smartsheet.createClient({ accessToken: 'x' });

  it('has exactly the recorded top-level namespaces', () => {
    expect(Object.keys(client).sort()).toEqual(Object.keys(fixture).sort());
  });

  it.each(Object.keys(fixture))('%s has exactly the recorded members', (ns) => {
    expect(Object.keys(client[ns]).sort()).toEqual(fixture[ns]);
  });

  it.each(Object.keys(fixture).filter((ns) => ns !== 'constants'))('%s members are all functions', (ns) => {
    for (const member of fixture[ns]) {
      expect(typeof client[ns][member]).toBe('function');
    }
  });
});
