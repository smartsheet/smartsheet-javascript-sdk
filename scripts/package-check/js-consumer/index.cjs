// Plain CommonJS consumer: loads the packed SDK and checks every client
// namespace and member against the recorded method surface.
const fs = require('fs');
const smartsheet = require('smartsheet');

const fixture = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const client = smartsheet.createClient({ accessToken: 'x' });
const problems = [];

const actualNamespaces = Object.keys(client).sort();
const expectedNamespaces = Object.keys(fixture).sort();
for (const ns of expectedNamespaces) if (!actualNamespaces.includes(ns)) problems.push(`missing namespace: ${ns}`);
for (const ns of actualNamespaces) if (!expectedNamespaces.includes(ns)) problems.push(`extra namespace: ${ns}`);

for (const ns of expectedNamespaces) {
  if (!client[ns]) continue;
  const actual = Object.keys(client[ns]);
  for (const m of fixture[ns]) if (!actual.includes(m)) problems.push(`missing: ${ns}.${m}`);
  for (const m of actual) if (!fixture[ns].includes(m)) problems.push(`extra: ${ns}.${m}`);
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`JS consumer OK (${expectedNamespaces.length} namespaces)`);
