require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },

    email: {
      type: String,
      require: true,
      lowercase: true,
      unique: [true, "Email Already Exist...."],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please Enter A Valid Email");
        }
      },
    },
    username: {
      type: String,
      require: true,
      trim: true,
    },
    pass: {
      type: String,
      require: true,
      trim: true,
    },

    profilepic: {
      type: String,
      trim: true,
      default: "",
    },
    about:{
      type: String,
      require: true,
      trim: true,
    }
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("pass")) {
    const pass = await bcrypt.hash(this.pass, 12);
    this.pass = pass;
  }

  next();
});

module.exports = mongoose.model("Users", UserSchema);
