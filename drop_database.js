#!/usr/bin/env node
"use strict";

const pg = require("pg-promise")();
const drop = require("./lib/drop");
const config = require("./lib/load-configuration")(process.cwd());
const DEFAULT_DATABASE = process.env.POSTGRES_DB || "postgres";
const db = pg(Object.assign({}, config, { database: DEFAULT_DATABASE }));
const DEBUG = process.env.DEBUG || false;

if (
  (process.env.NODE_ENV || "").indexOf("production") !== -1 &&
  process.env.FORCE !== "true"
) {
  console.warn("You were about to drop a production database");
  console.warn("To drop a production database you must pass FORCE=true");
  console.warn(
    "For example: NODE_ENV=production FORCE=true ./node_modules/.bin/drop_database"
  );
  return process.exit(1);
}

drop(config.database, db)
  .then(() => {
    console.log(`Dropped ${config.database}`);
    process.exit(0);
  })
  .catch(err => {
    if (DEBUG) {
      console.log(`Failed to drop ${config.database}`);
      console.error(err);
    } else {
      console.error(
        `Failed to drop ${config.database} (Run with DEBUG=true to see stack trace)`
      );
    }
    process.exit(1);
  });
