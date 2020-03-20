const mongoose = require("mongoose"),
  Post = mongoose.model("posts"),
  User = mongoose.model("users"),
  Comment = mongoose.model("comments"),
  isLoggedIn = require("../../middleware/isLoggedIn");
//   isAuthorizedToEditComment = require("../../middleware/isAuthorizedToEditComment");

module.exports = app => {
    // get all post comments
  app.get("/api/posts/show/:postId/comments", async (req, res) => {
    try {
      const foundPost = await Post.findById(req.params.postId)
        .populate({ path: "comments", model: Comment })
        .exec();
    //   console.log(foundPost);
      res.send(foundPost.comments);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

  // add new comment
  app.post("/api/posts/show/:postId/comments/new", async (req, res) => {
    try {
      const foundPost = await Post.findById(req.params.postId);
      const newComment = await new Comment({
        text: req.body.commentBody,
        user: { id: req.user._id, name: req.user.bio.name },
        post: req.params.postId
      }).save();
      await foundPost.comments.push(newComment);
      await foundPost.save();
      await req.user.comments.push(newComment);
      await req.user.save();
      res.send(newComment);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }

    // console.log(req.params.postId);
    // console.log(req.body);
    // console.log(req.user.id);
    // res.send({});
  });
};
