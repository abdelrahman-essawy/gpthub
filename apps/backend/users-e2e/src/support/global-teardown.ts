/* eslint-disable */

import { subProcessSync } from 'subspawn';

module.exports = async function () {
  // Put clean up logic here (e.g. stopping services, docker-compose, etc.).
  // Hint: `globalThis` is shared between setup and teardown.

  subProcessSync(
    'docker compose --env-file .env.e2e -f docker-compose.e2e.yml down users-database-e2e -v',
    true,
  );

  console.log(globalThis.__TEARDOWN_MESSAGE__);
};
