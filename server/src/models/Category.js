require("dotenv").config();
const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    CatName: {
      type: String,
      require: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
