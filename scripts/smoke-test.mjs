import assert from 'node:assert/strict';
import { readdir } from 'node:fs/promises';
import { createServer } from 'node:net';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const portServer = createServer();
await new Promise((resolve, reject) => {
  portServer.once('error', reject);
  portServer.listen(0, '127.0.0.1', resolve);
});
const { port } = portServer.address();
await new Promise((resolve, reject) => portServer.close(error => error ? reject(error) : resolve()));

const server = spawn(process.execPath, ['server.js'], {
  cwd: projectRoot,
  env: { ...process.env, PORT: String(port) },
  stdio: 'ignore',
});
const baseUrl = `http://127.0.0.1:${port}`;

async function get(pathname, contentType) {
  let response;
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      response = await fetch(`${baseUrl}${pathname}`);
      break;
    } catch {
      if (server.exitCode !== null) throw new Error(`Server exited with code ${server.exitCode}`);
      await delay(100);
    }
  }
  assert.ok(response, `Server did not respond to ${pathname}`);
  assert.equal(response.status, 200, `${pathname} should return HTTP 200`);
  assert.ok(response.headers.get('content-type')?.startsWith(contentType), `${pathname} should use ${contentType}`);
  return response;
}

try {
  const pageResponse = await get('/', 'text/html');
  const page = await pageResponse.text();
  assert.match(page, /UGA Garage Door Repair LLC/);
  assert.match(page, /assets\/project-0604-private\.webp/);

  await get('/styles.css', 'text/css');
  await get('/script.js', 'text/javascript');
  const assets = (await readdir(path.join(projectRoot, 'assets'))).filter(name => name.endsWith('.webp'));
  assert.ok(assets.length > 0, 'At least one WebP image should be present');
  for (const asset of assets) await get(`/assets/${encodeURIComponent(asset)}`, 'image/webp');

  const missing = await fetch(`${baseUrl}/missing-file`);
  assert.equal(missing.status, 404, 'Unknown paths should return HTTP 404');
  const unsupported = await fetch(baseUrl, { method: 'POST' });
  assert.equal(unsupported.status, 405, 'Unsupported methods should return HTTP 405');
  console.log(`Smoke test passed: page, styles, script, ${assets.length} images, 404, and 405.`);
} finally {
  server.kill();
}
