const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
  user: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String
  },
  body: String,
  published: { type: Boolean, default: false },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});

module.exports = mongoose.model("posts", postSchema);
