const { Post } = require("./models/index");
const db = require("./db");

async function seedUsers() {
    return await Post.bulkCreate([
        {
            title: "Hello",
            content: "This is a test post"
        }
    ]);
}

async function seed() {
    await db.sync({
        force: true,
    });

    // Bulk create users
    const users = await seedUsers();
}

seed();

module.exports = seed;