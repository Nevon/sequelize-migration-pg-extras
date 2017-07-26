const path = require("path");
const toPgConfiguration = require("./configuration-mapper");

const ENVIRONMENT = process.env.NODE_ENV || "development";

module.exports = rootPath => {
  let configPath;
  try {
    configPath = require(path.join(rootPath, ".sequelizerc")).config;
    if (!configPath) {
      throw new Error();
    }
  } catch (err) {
    configPath = path.join(rootPath, "config/config.json");
  }

  let config;
  try {
    config = require(configPath);
    console.log("Using configuration in", configPath);
  } catch (err) {
    console.error("Configuration not found in", configPath);
    throw err;
  }

  config = config[ENVIRONMENT];
  if (!config) {
    console.error("Environment", ENVIRONMENT, "not found in file", configPath);
    throw new Error("environment not found");
  } else {
    return toPgConfiguration(config);
  }
};
