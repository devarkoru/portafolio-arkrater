const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/environments');
const file = 'environment.ts';
const filePath = path.join(dir, file);

// If environment.ts already exists and we are NOT on Vercel/production, skip.
// This keeps your local development configurations untouched.
if (fs.existsSync(filePath) && !process.env.VERCEL) {
  console.log('Local environment.ts already exists. Skipping generation.');
  process.exit(0);
}

// Ensure the directory exists
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Read keys from secure Vercel environment variables or fallback to placeholders
const production = process.env.PRODUCTION === 'true' || false;
const rapidApiKey = process.env.RAPIDAPI_KEY || 'YOUR_RAPIDAPI_KEY_HERE';
const rapidApiHost = process.env.RAPIDAPI_HOST || 'mail-sender-api1.p.rapidapi.com';

const content = `export const environment = {
  production: ${production},
  rapidApiKey: '${rapidApiKey}',
  rapidApiHost: '${rapidApiHost}'
};
`;

try {
  fs.writeFileSync(filePath, content, { encoding: 'utf8' });
  console.log(`Successfully generated environment.ts at ${filePath}`);
} catch (error) {
  console.error('Failed to write environment.ts', error);
  process.exit(1);
}
