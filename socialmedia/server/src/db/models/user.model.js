const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class User extends Model {}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        followed: {
            type: DataTypes.ARRAY,
        },
    },
    {
        sequelize: db,
    }
);

User.sync();

module.exports = User;
