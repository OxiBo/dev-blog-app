const mongoose = require("mongoose"),
  Comment = mongoose.model("comments");

module.exports = async (req, res, next) => {
  try {
    const foundComment = await Comment.findById(req.params.commentId);

    if (foundComment && req.user && req.user._id.equals(foundComment.user.id)) {
      next();
    } else {
      return res.status(401).send({ error: "You are not authorized!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
