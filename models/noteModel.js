const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  title: String,
  body: String,
  time: Date
});

module.exports = mongoose.model("note", noteSchema);
