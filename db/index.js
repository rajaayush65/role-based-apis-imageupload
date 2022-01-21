const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected To Database");
  })
  .catch((e) => {
    console.log("Connection Error", e.message);
  });

const db = mongoose.connection;
module.exports = db;
