#!/usr/bin/env node
"use strict";

const pg = require("pg-promise")();
const create = require("./lib/create");
const config = require("./lib/load-configuration")(process.cwd());
const DEFAULT_DATABASE = process.env.POSTGRES_DB || "postgres";
const db = pg(Object.assign({}, config, { database: DEFAULT_DATABASE }));
const DEBUG = process.env.DEBUG || false;

create(config.database, db)
  .then(() => {
    console.log(`Created ${config.database}`);
    process.exit(0);
  })
  .catch(err => {
    if (DEBUG) {
      console.log(`Failed to create ${config.database}`);
      console.error(err);
    } else {
      console.error(
        `Failed to create ${config.database} (Run with DEBUG=true to see stack trace)`
      );
    }
    process.exit(1);
  });
