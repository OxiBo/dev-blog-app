const mongoose = require("mongoose"),
  Post = mongoose.model("posts"),
  User = mongoose.model("users"),
  Comment = mongoose.model("comments"),
  isLoggedIn = require("../../middleware/isLoggedIn");
(isAuthorizedToDeleteComment = require("../../middleware/isAuthorizedToDeleteComment")),
  (isAuthorizedToEditComment = require("../../middleware/isAuthorizedToEditComment"));

module.exports = (app) => {
  // get all post comments
  app.get("/api/posts/show/:postId/comments", isLoggedIn, async (req, res) => {
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
  app.post(
    "/api/posts/show/:postId/comments/new",
    isLoggedIn,
    async (req, res) => {
      try {
        const foundPost = await Post.findById(req.params.postId);
        const user = await User.findById(req.user._id);
        const newComment = await new Comment({
          text: req.body.text,
          user: {
            id: req.user._id,
            name: req.user.bio.name,
            avatar: user.bio.avatar,
          },
          post: req.params.postId,
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
    }
  );

  //  create middleware for checking the right to edit post
  app.patch(
    "/api/posts/show/:postId/comments/edit/:commentId",
    isLoggedIn,
    isAuthorizedToEditComment,
    async (req, res) => {
      // console.log(req.body);
      try {
        const { text, createdAt } = req.body;
        const updatedComment = await Comment.findByIdAndUpdate(
          req.params.commentId,
          {
            text,
            createdAt,
          },
          { new: true } // to get new updated comment back
        );
        // console.log(updatedComment);
        res.send(updatedComment);
      } catch (err) {
        console.error(err);
        res.status(500).send(err);
      }
    }
  );

  app.delete(
    "/api/posts/show/:postId/comments/:id",
    isAuthorizedToDeleteComment,
    async (req, res) => {
      console.log(req.params.id);
      try {
        await Comment.findByIdAndRemove(req.params.id);
        res.send({});
      } catch (err) {
        console.error(err);
        res.status(500).send(err);
      }
    }
  );
};
