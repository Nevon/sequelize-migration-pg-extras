module.exports = sequelizeConfig => {
  return Object.assign({}, sequelizeConfig, { user: sequelizeConfig.username });
};
