"use strict";

const checkForExistingDatabase = (databaseName, client) =>
  client.none("SELECT 1 from pg_database WHERE datname = $1", databaseName);

// Postgres doesn't support parameterized queries for `CREATE DATABASE ...`
const createDatabase = (databaseName, client) =>
  client.none(`CREATE DATABASE ${databaseName}`);

module.exports = (databaseName, client) => {
  return checkForExistingDatabase(databaseName, client).then(() =>
    createDatabase(databaseName, client)
  );
};
