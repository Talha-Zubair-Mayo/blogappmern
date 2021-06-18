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

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.pass) {
      const salt = await bcrypt.genSalt(12);
      req.body.pass = await bcrypt.hash(req.body.pass, salt);
    }
    const user = await User.findById(req.params.id);

    const bodyemail = req.body.email;
   
    try {
      if (bodyemail) {
        var bodymail = bodyemail.toLowerCase();
      }
      if (user.email === bodymail) {
        res.status(404).json({ error: "Email Already Exist.." });
      } else {
        const updateUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );

        console.log(updateUser);
        res.status(200).json({ message: "Profile Updated Successfully" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(404).json({ error: "You Can update Only your account" });
  }
});

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        if (req.body.username === user.username) {
          await Post.deleteMany({ username: user.username });
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json({ message: "User Deleted Successfully" });
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json(error);
    }
  } else {
    res.status(401).json("You can Delete only your Account");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { pass, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {}
});

module.exports = router;
