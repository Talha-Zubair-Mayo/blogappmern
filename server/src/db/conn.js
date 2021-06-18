const mongoose  = require("mongoose");
const DB = process.env.DB_Connect;
/* Creating a Database */
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false,
  })
  .then(() => {
    console.log(`Connected To Online Db Successfully...... `);
  })
  .catch((err) => {
    console.log(`Connection failed`);
  });