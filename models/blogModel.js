const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Blog must have a title"],
  },

  body: {
    type: String,
    required: [true, "Blog must have a body"],
  },
}, { timestamps: true });

const blog = mongoose.model("Blog", blogSchema);
module.exports = blog;