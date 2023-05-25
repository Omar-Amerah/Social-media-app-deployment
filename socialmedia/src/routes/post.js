const { Router } = require("express");
const express = require("express");
const { Post, User } = require("../db/models");
const moment = require('moment');

const router = express.Router();

router.get("/posts", async (_, resp) => {
   const data = await Post.findAll()
    resp.json({
        message: "Successfully fetched all posts",
        result: data,
    });
});


// Assuming you have the necessary imports and setup

router.get("/posts/followed/:id", async (req, res) => {
  const userId = req.params.id; 
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const followedUsers = user.followed;

    const posts = await Post.findAll({
      where: {UserId: followedUsers,}});


    return res.json({ posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
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
// router.put("/posts/:postId", async (req, res) => {
//   try {
//     const post = await Post.findByPk(req.params.postId);
//     if (!post) {
//       return res.status(404).json({
//         message: "Post not found",
//       });
//     }
//     post.title = req.body.title;
//     post.content = req.body.content;
//     post.likes = req.body.likes;
//     await post.save();
//     return res.json({
//       message: "Post updated successfully",
//       result: post,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "Failed to update post",
//     });
//   }
// });