require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
require("./db/conn");
const auth = require("./routers/auth");
const user = require("./routers/User");
const post = require("./routers/Post");
const Category = require("./routers/Category");
const multer = require("multer");
const path = require("path");

console.log(path.join(__dirname, "../images"))
const imgpath = express.static(path.join(__dirname, "../images"))
app.use("/api/auth" , auth);
app.use("/api/users" , user);
app.use("/api/posts" , post);
app.use("/api/Category" , Category);
app.use("/images" , imgpath);


// FIle Uploading

const storage = multer.diskStorage(
  {
    destination:(req, file,cb)=>
    {
      cb(null , 'images');
    },
    filename:(req , file , cb)=>
    {
      cb(null , req.body.name);
    }
  }
);

const upload = multer({storage:storage});
 
app.post("/api/upload" , upload.single("file") , (req, res)=>
{
  res.status(200).json({Message:"File Uploaded Successfully...."})
} )


app.listen(port, () => {
  console.log(`server Running On port ${port}`);
});