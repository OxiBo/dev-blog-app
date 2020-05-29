const mongoose = require("mongoose");
const { Schema } = mongoose;
const Comment = require("./Comment");

const postSchema = new Schema({
  title: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  body: String,
  published: { type: Boolean, default: false },
  likes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

// arrow function does not work here
// https://www.youtube.com/watch?v=5iz69Wq_77k
postSchema.pre("remove", async function (next) {
  try {
    await Comment.remove({
      _id: {
        $in: this.comments,
      },
    }).exec();
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = mongoose.model("posts", postSchema);
