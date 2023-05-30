// const { Sequelize } = require("sequelize");
// const path = require("path");

// const db = new Sequelize({
//     dialect: "sqlite",
//     storage: path.join(__dirname, "posts.sqlite"),
//     logging: false,
// });

// module.exports = db;

const { Sequelize } = require('sequelize');
const config = require('./config');

// Initialize Sequelize
const db = new Sequelize("Social", "Admin", "Password123*", {
  host: config.host,
  dialect: 'postgres',
});

module.exports = db;