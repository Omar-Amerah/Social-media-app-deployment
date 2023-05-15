const Post = require("./post.model");
const User = require("./user.model")

User.hasMany(Post);
Post.belongsTo(User);

module.exports = { Post, User };