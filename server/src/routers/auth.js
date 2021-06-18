const express = require("express");
const app = express();
const router = express.Router();
const bcrypt = require("bcrypt");
const cors = require("cors");
const User = require("../models/User");

router.use(express.json());
app.use(express.urlencoded({ expexted: false }));
router.use(cors());

/* Register */
router.post("/register", async (req, res) => {
  const { name, email, pass, username  , profilepic , about} = req.body;

  try {
    const emailexist = await User.findOne({ email: email });
    const usernameExist = await User.findOne({ username: username });
    if (!name || !email || !pass || !username  ) {
      res.status(422).json({ error: "Please Fill All Feilds" });
    } else if (emailexist) {
      return res.status(422).send({ Error: "Email Already Exist" });
    } else if (usernameExist) {
      return res.status(422).send({ Error: "Username Already Exist" });
    } else {
      const user = new User({ name, email, pass, username  , profilepic , about});
      console.log(user);
      const registered = await user.save();
      console.log(registered);

      return res.status(201).send({ Message: "User Registered Successfully" });
    }
  } catch (error) {
    return res.status(400).send({ Error: "Failed To Register User" });
  }
});

router.post("/login", async (req, res) => {
  
  const { email, pass } = req.body;
  if (!email || !pass) {
    res.status(422).json({ error: "Please Fill All Feilds" });
  }

  try {
    const lower = email.toLowerCase();
    const UserEmail = await User.findOne({ email: lower });
    
    if (UserEmail) {
      /* Comparing Pass From Front END And From DB */
      const isMatch = await bcrypt.compare(pass, UserEmail.pass);
      if (isMatch) {
        //   /* Generating Auth Token */
        //   const token = await UserEmail.generateAuthToken();
        //   console.log(token);

        //   /* Storing The Cookie */
        //   res.cookie("MERNCookie", token, {
        //     //   expires:new Date(Date.now()+3600000),
        //     expires: new Date(Date.now() + 5 * 60000),
        //     httpOnly: true,
        //   });

        res.status(200).json(UserEmail);
      } else {
        res.status(422).json({ error: "Email or Password is incorrect" });
      }
    } else {
      res.status(422).json({ error: "User Does't Exist " });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
