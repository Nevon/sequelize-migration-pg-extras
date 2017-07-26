"use strict";

const checkForExistingDatabase = (databaseName, client) =>
  client.one("SELECT 1 from pg_database WHERE datname = $1", databaseName);

// Postgres doesn't support parameterized queries for `DROP DATABASE ...`
const dropDatabase = (databaseName, client) =>
  client.none(`DROP DATABASE ${databaseName}`);

module.exports = (databaseName, client) => {
  return checkForExistingDatabase(databaseName, client).then(() =>
    dropDatabase(databaseName, client)
  );
};
