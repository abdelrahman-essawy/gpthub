/* eslint-disable */
var __TEARDOWN_MESSAGE__: string;
import { subProcessSync } from 'subspawn';

module.exports = async function () {
  // Start services that the app needs to run (e.g. database, docker-compose, etc.).
  console.log('\nSetting up...\n');

  subProcessSync(
    'docker-compose --env-file .env.e2e -f docker-compose.e2e.yml up users-database-e2e  --detach  --wait -V',
    true,
  );

  // Hint: Use `globalThis` to pass variables to global teardown.
  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n';
};
