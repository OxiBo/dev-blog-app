const mongoose = require("mongoose").set("debug", true),
  Post = mongoose.model("posts");

module.exports = async (req, res, next) => {
  try {
    const foundPost = await Post.findById(req.params.postId);

    if (foundPost && req.user && req.user._id.equals(foundPost.user.id)) {
      next();
    } else {
      return res.status(401).send({ error: "You are not authorized!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
