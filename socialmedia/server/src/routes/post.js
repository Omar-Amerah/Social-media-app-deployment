const { Router } = require("express");
const express = require("express");
const { Post } = require("../db/models");
const moment = require('moment');

const router = express.Router();

router.get("/posts", async (_, resp) => {
    resp.json({
        message: "Successfully fetched all posts",
        result: await Post.findAll(),
    });
});



router.get("/posts/:id", async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id);
      if (!post) {
        res.status(404).json({
          message: "Post not found",
        });
      } else {
        res.json({
          message: "Successfully retrieved post",
          result: post,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error retrieving post",
      });
    }
  });

  router.get("/posts/user/:id", async (req, res) => {
    try {
      const post = await Post.findAll({where: { UserId: req.params.id } });
      if (!post) {
        res.status(404).json({
          message: "Post not found",
        });
      } else {
        res.json({
          message: "Successfully retrieved post",
          result: post,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error retrieving post",
      });
    }
  });
  

router.post("/posts", async (req, res) => {
    try {
      const { title, content, id } = req.body;
      console.log(id)
      const postdate = moment().format('dddd, D/M/YYYY'); // format postdate as 'Weekday, day/month/year'
      const post = await Post.create({ title, content, UserId: id, postdate  });
      res.status(201).json({
        message: "Successfully created post",
        result: post,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error creating post",
      });
    }
  });

  router.put("/posts/:postId", async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.postId);
      if (!post) {
        return res.status(404).json({
          message: "Post not found",
        });
      }
      post.title = req.body.title;
      post.content = req.body.content;
      post.likes = req.body.likes;
      await post.save();
      return res.json({
        message: "Post updated successfully",
        result: post,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Failed to update post",
      });
    }
  });

  router.delete("/posts", async (_, resp) => {
    await Post.destroy({ where: {} });
    resp.json({
        message: "Successfully deleted all posts",
    });
});

router.delete("/posts/:id", async (req, res) => {
  await Post.destroy({ where: {id: req.params.id} });
  res.json({
      message: "Successfully deleted all posts",
  });
});


module.exports = router;
