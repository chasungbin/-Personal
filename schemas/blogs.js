const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({
  boardId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,

  },
  title: {
    type: String
  },
  password: {
    type: Number,
    unique: true,
  },
  comment: {
    type: String
  },
  borderDate: {
    type: Date
  }

});

module.exports = mongoose.model("Blogs", blogsSchema);