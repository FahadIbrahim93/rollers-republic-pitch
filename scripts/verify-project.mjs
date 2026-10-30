#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const checks = [];

function ok(label, detail) {
  checks.push({ label, ok: true, detail });
}

function fail(label, detail) {
  checks.push({ label, ok: false, detail });
}

function exists(relPath) {
  return fs.existsSync(path.join(root, relPath));
}

const requiredPaths = [
  'app/package.json',
  'server/package.json',
  'server/seed.json',
  'docs/SSOT.md',
  'docs/API.md',
  'docs/ARCHITECTURE.md',
  'AGENTS.md',
  'README.md',
  'package.json'
];

for (const file of requiredPaths) {
  if (exists(file)) {
    ok(`found ${file}`, 'required project file is present');
  } else {
    fail(`missing ${file}`, 'repo bootstrap is incomplete');
  }
}

const nodeVersion = process.versions.node;
if (Number(nodeVersion.split('.')[0]) >= 20) {
  ok('Node version', `Node ${nodeVersion} satisfies the project requirements`);
} else {
  fail('Node version', `Node ${nodeVersion} is below the required 20+`);
}

const appPackage = exists('app/package.json') ? JSON.parse(fs.readFileSync(path.join(root, 'app/package.json'), 'utf8')) : null;
const serverPackage = exists('server/package.json') ? JSON.parse(fs.readFileSync(path.join(root, 'server/package.json'), 'utf8')) : null;

if (appPackage?.scripts?.dev) {
  ok('app scripts', 'frontend dev task is configured');
} else {
  fail('app scripts', 'app/package.json is missing a dev script');
}

if (serverPackage?.scripts?.start) {
  ok('server scripts', 'backend start task is configured');
} else {
  fail('server scripts', 'server/package.json is missing a start script');
}

const lockFiles = ['app/package-lock.json', 'server/package-lock.json'];
for (const lockFile of lockFiles) {
  if (exists(lockFile)) {
    ok(`lockfile ${lockFile}`, 'dependency lock is present');
  } else {
    fail(`lockfile ${lockFile}`, 'dependency lock is missing; run npm install');
  }
}

const failures = checks.filter((item) => !item.ok);

if (failures.length > 0) {
  console.log('Project readiness check failed:\n');
  for (const item of checks) {
    const prefix = item.ok ? 'OK' : 'FAIL';
    console.log(`${prefix} - ${item.label}: ${item.detail}`);
  }
  process.exit(1);
}

console.log('Project readiness check passed.\n');
for (const item of checks) {
  console.log(`OK - ${item.label}: ${item.detail}`);
}

console.log('\nRecommended next steps:');
console.log('1. npm run setup');
console.log('2. cd app && npm run dev');
console.log('3. cd server && npm start');
console.log('4. cd app && npm run test -- --run');
