const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  createdAt: { type: Date, default: Date.now,  },
  text: String,
  user: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    avatar: String
  },
  post: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }
  },
//   reply: [{ type: mongoose.Schema.Types.ObjectId, ref: "CommentReply" }] //????
});

module.exports = mongoose.model("comments", commentSchema);
