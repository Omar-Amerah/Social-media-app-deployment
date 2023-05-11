const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Post extends Model {}

Post.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: false,
        },
        postdate: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize: db,
    }
);

Post.sync();

module.exports = Post;
