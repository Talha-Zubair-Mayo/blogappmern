const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const Post = require("../models/Post");
const Category = require("../models/Category");
require("../models/User");
require("../models/Post");
require("../models/Category");

router.use(express.json());
app.use(express.urlencoded({ expexted: false }));
router.use(cors());

// Create Post

router.post("/", async (req, res) => {
  const { CatName } = req.body;
  if (!CatName) {
    res.status(422).json({ error: "Please Fill Category" });
  }
  try {
    const newCategory = new Category({ CatName });
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Category
router.put("/:id", async (req, res) => {
  if (req.body.CatId === req.params.id) {
    try {
      const updateCategory = await Category.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      console.log(updateCategory);
      res.status(200).json({ message: "Category Updated Successfully" });
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(404).json({ error: "You Can update Only your Category" });
  }
});

// Delete Category
router.delete("/:id", async (req, res) => {
  if (req.body.CatId === req.params.id) {
    try {
      const Categ = await Category.findById(req.params.id);
      try {
        await Categ.delete();
        res.status(200).json({ message: "Category Deleted Successfully" });
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json(error);
    }
  } else {
    res.status(401).json("You can Delete only your Category");
  }
});

// Get Single Category

router.get("/:id", async (req, res) => {
  try {
    const Cat = await Category.findById(req.params.id);

    res.status(200).json(Cat);
  } catch (error) {}
});

// Get Categories
router.get("/", async (req, res) => {
  try {
    const Categories = await Category.find();

    res.status(200).json(Categories);
  } catch (error) {}
});

module.exports = router;
