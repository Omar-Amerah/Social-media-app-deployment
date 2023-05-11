const { Router } = require("express");
const express = require("express");
const { Post } = require("../db/models");

const router = express.Router();

router.get("/posts", async (_, resp) => {
    resp.json({
        message: "Successfully fetched all posts",
        result: await Post.findAll(),
    });
});

router.delete("/posts", async (_, resp) => {
    await Post.destroy({ where: {} });
    resp.json({
        message: "Successfully deleted all posts",
    });
});

router.get("/posts/:postId", async (req, resp) => {
    resp.json({
        message: "Successfully retrieved post",
        result: req.task.toJSON(),
    });
});

module.exports = router;
