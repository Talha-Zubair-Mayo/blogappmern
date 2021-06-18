const express = require("express");
const app = express();
const router = express.Router();
const bcrypt = require("bcrypt");
const cors = require("cors");
const User = require("../models/User");
const Post = require("../models/Post");
require("../models/User");
require("../models/Post");

router.use(express.json());
app.use(express.urlencoded({ expexted: false }));
router.use(cors());

// Create Post

router.post("/", async (req, res) => {
 
  const { title, desc, username  , photo} = req.body;
  console.log(photo)
  if (!title || !desc || !username || !photo) {
    res.status(422).json({ error: "Please Fill All Feilds" });
  }
  try {
    const newPost = new Post({ title, desc, username , photo });
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Post
router.put("/:id", async (req, res) => {
  if (req.body.postId === req.params.id) {
    try {
      const updatePost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      console.log(updatePost);
      res.status(200).json({ message: "Post Updated Successfully" });
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(404).json({ error: "You Can update Only your Post" });
  }
});

// Delete Post
router.delete("/:id", async (req, res) => {
 
  if (req.body.postId === req.params.id) {
    try {
      const post = await Post.findById(req.params.id);
      console.log(req.body.username)
      try {
        if (post.username === req.body.username) {
          await post.delete();
          res.status(200).json({ message: "Post Deleted Successfully" });
        } else {
          res.status(401).json("You can Delete only your Post");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json(error);
    }
  } else {
    res.status(401).json("You can Delete only your Post");
  }
});

// Get Single post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (error) {}
});

// Get Posts
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.catName;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        }
      });
    } else {
      posts = await Post.find();
    }

    res.status(200).json(posts);
  } catch (error) {}
});

module.exports = router;
