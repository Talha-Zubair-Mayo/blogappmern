require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
      unique:true
    },

    desc: {
      type: String,
      require: true,
      trim: true,
    },

    username: {
      type: String,
      require: true,
      trim: true,
    },

    photo: {
      type: String,
      trim: true,
      default: "",
    },
    categories: {
      type: Array,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", PostSchema);
