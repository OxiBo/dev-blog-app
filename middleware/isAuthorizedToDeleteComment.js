const mongoose = require("mongoose").set("debug", true),
  Post = mongoose.model("posts");
Comment = mongoose.model("comments");

module.exports = async (req, res, next) => {
  try {
    const foundPost = await Post.findById(req.params.postId);
    const foundComment = await Comment.findById(req.params.id);
    if (
      req.user &&
      foundPost &&
      foundPost &&
      (req.user._id.equals(foundPost.user.id) ||
        req.user._id.equals(foundComment.user.id))
    ) {
      next();
    } else {
      return res.status(401).send({ error: "You are not authorized!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
