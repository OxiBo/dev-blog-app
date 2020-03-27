const mongoose = require("mongoose"),
  { Schema } = mongoose;

const userSchema = new Schema({
  bio: {
    age: { type: String, default: "Not specified" },
    avatar: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1534944845791-f9e35a201bf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
    },
    name: String,
    email: { type: String, default: "Not specified"},
    occupation: { type: String, default: "Not specified" },
    gender: { type: String, default: "Not specified" }
  },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  google: {
    id: String,
    email: String,
    name: String,
    token: String
  },
  github: {
    id: String,
    email: String,
    name: String,
    token: String
  },
  twitter: {
    id: String,
    email: String,
    name: String,
    token: String
  },
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("users", userSchema);
