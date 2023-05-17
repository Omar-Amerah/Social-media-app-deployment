const { Router } = require("express");
const express = require("express");
const { User } = require("../db/models");
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
      console.log(user);
      if (!user) {
        return res.status(422).json({
          message: "Incorrect username or password",
        });
      }
  
      const match = await bcrypt.compare(password, user.password);
      console.log(match);
      if (!match) {
        return res.status(422).json({
          message: "Incorrect username or password",
        });
      }
      res.clearCookie('user')
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



//   router.put("/posts/:postId", async (req, res) => {
//     try {
//       const post = await Post.findByPk(req.params.postId);
//       if (!post) {
//         return res.status(404).json({
//           message: "Post not found",
//         });
//       }
//       post.title = req.body.title;
//       post.content = req.body.content;
//       post.likes = req.body.likes;
//       await post.save();
//       return res.json({
//         message: "Post updated successfully",
//         result: post,
//       });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({
//         message: "Failed to update post",
//       });
//     }
//   });

  router.delete("/users", async (_, resp) => {
    await User.destroy({ where: {} });
    resp.json({
        message: "Successfully deleted all users",
    });
});

module.exports = router;
