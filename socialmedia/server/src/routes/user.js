const { Router } = require("express");
const express = require("express");
const { User, Post } = require("../db/models");
const moment = require('moment');
const bcrypt = require('bcrypt');


const router = express.Router();
const SALT_COUNT = 10;

router.get("/users", async (_, resp) => {
    resp.json({
        message: "Successfully fetched all users",
        result: await User.findAll(),
    });
});

router.get("/clearcookies", (req, res) => {
  res.clearCookie("user");
  // Add more clearCookie statements for each cookie you want to clear
  res.json({
    message: "Cookies cleared successfully",
  });
});

router.get("/user/:id", async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        res.status(404).json({
          message: "User not found",
        });
      } else {
        res.json({
          message: "Successfully retrieved user",
          result: user,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error retrieving user",
      });
    }
  });

  

  router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(422).json({
          message: "Incorrect username or password",
        });
      }
  
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(422).json({
          message: "Incorrect username or password",
        });
      }
      res.clearCookie("user")
      const userCookie = { id: user.id, name: user.name };
      const userCookieString = JSON.stringify(userCookie);
      res.cookie("user", userCookieString);
      
      res.json({
        message: "Successfully logged in",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error logging in",
      });
    }
  });
  
  

router.post("/user", async (req, res) => {
    try {
      const { username, password, email } = req.body;

        if(!/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(password))
        {
            return res.status(500).json({
                message: "Password must be more than 8 characters and contain a capital letter, special number and a number",
              });
        }

      const hash = await bcrypt.hash(password, SALT_COUNT)
      const user = await User.create({ username, password: hash, email });
      res.status(201).json({
        message: "Successfully created user",
        result: user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error creating user",
      });
    }
  });


  router.put("/users/follow", async (req, res) => {
    const {id, number} = req.body;
    try {
      const user = await User.findByPk(number);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.followed.includes(id)) {
        user.followed = user.followed.filter(u => u !== id);
        await user.update({ followed: user.followed });
        return res.json({ message: "Unfollowed" });
      } else {
      const followedArray = [...user.followed, id];
      await user.update({ followed: followedArray });
      return res.json({ message: "Followed" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  // router.put("/users/like", async (req, res) => {
  //   const { id, number } = req.body;
  //   try {
  //     const user = await User.findByPk(id);
  //     const post = await Post.findByPk(number);
  
  //     if (!post) {
  //       return res.status(404).json({ message: "Post not found" });
  //     }
  
  //     // Check if the post is already liked by the user
  //     if (user.liked.includes(number)) {
  //       // Remove the post ID from the liked array
  //       user.liked = user.liked.filter((postId) => postId !== number);
  
  //       // Decrease the post's liked count
  //       post.likes--;
  
  //       // Update the user and post
  //       await user.save();
  //       await post.save();
  
  //       return res.json({ message: "Post unliked" });
  //     } else {
  //       // Add the post ID to the liked array
  //       user.liked.push(number);
  
  //       // Increase the post's liked count
  //       post.likes++;
  
  //       // Update the user and post
  //       await user.save();
  //       await post.save();
  
  //       return res.json({ message: "Post liked" });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ message: "Internal server error" });
  //   }
  // });
  

  router.delete("/users", async (_, resp) => {
    await User.destroy({ where: {} });
    resp.json({
        message: "Successfully deleted all users",
    });
});

module.exports = router;
