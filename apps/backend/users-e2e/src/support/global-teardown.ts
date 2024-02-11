/* eslint-disable */

import { subProcessSync } from 'subspawn';

module.exports = async function () {
  // Put clean up logic here (e.g. stopping services, docker-compose, etc.).
  // Hint: `globalThis` is shared between setup and teardown.

  subProcessSync('docker compose down users-database', true);
  console.log(globalThis.__TEARDOWN_MESSAGE__);
};
