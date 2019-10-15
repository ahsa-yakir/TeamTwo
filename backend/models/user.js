const Sequelize = require("sequelize");
const config = require("../sqlizeConfig");
let sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
  });

let User = sequelize.define("user", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "user_id",
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "email",
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "password",
    },
  }, {
    tableName: "user",
    timestamps: false,
  });

module.exports = User;
