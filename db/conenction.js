const { Sequelize } = require("sequelize");
const config = require("../config/config");

const sequelize = new Sequelize(
  config.databaseConnection.database,
  config.databaseConnection.username,
  config.databaseConnection.password,
  {
    host: config.databaseConnection.host,
    dialect: config.databaseConnection.dialect
  }
);

sequelize.authenticate()
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch(err => {
    console.error("Unable to connect:", err);
  });

module.exports = sequelize;