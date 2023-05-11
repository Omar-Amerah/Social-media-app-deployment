const Post = require("./post.model");
const User = require("./user.model")

User.hasMany(Post);
Post.belongsTo(Post);

module.exports = { Post, User };