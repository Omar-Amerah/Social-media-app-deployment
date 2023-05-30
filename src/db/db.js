const { Sequelize } = require("sequelize");
const path = require("path");

const db = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "posts.sqlite"),
    logging: false,
});

module.exports = db;
