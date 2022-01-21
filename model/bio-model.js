const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Biography = new Schema({
  bio: { type: String, required: true },
});

module.exports = mongoose.model("bio", Biography);
