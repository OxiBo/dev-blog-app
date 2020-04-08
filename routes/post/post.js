const mongoose = require("mongoose").set("debug", true),
  Post = mongoose.model("posts"),
  User = mongoose.model("users"),
  isLoggedIn = require("../../middleware/isLoggedIn"),
  isAuthorizedToEditPost = require("../../middleware/isAuthorizedToEditPost");

module.exports = app => {
  // get a list of all posts
  app.get("/api/posts", isLoggedIn, async (req, res) => {
    try {
      const foundPosts = await Post.find({ published: true });
      // console.log(foundPosts);
      return res.send(foundPosts);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  });

  // TODO - middleware to check if user has the right to see the posts (should be able to only see his drafts)
  app.get(
    "/api/user/:userId/posts/:published",
    isLoggedIn,
    async (req, res) => {
      // console.log(req.params.published);

      try {
        const foundUser = await User.findById(req.params.userId)
          .populate({
            path: "posts",
            model: Post,
            match: { published: req.params.published }
          })
          .exec();
        //   console.log(foundUser)
        return res.send(foundUser.posts);
      } catch (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    }
  );

  app.get("/api/posts/show/:postId", isLoggedIn, async (req, res) => {
    try {
      const foundPost = await Post.findById(req.params.postId);

      return res.send(foundPost);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.patch(
    "/api/posts/edit/:postId",
    isLoggedIn,
    isAuthorizedToEditPost,
    async (req, res) => {
      // console.log(req.body);
      try {
        const { title, body, image, published } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(req.params.postId, {
          title,
          body,
          image,
          published
        });

        res.send(updatedPost);
      } catch (err) {
        console.error(err);
        res.status(500).send(err);
      }
    }
  );

  app.delete("/api/posts/delete/:postId", isLoggedIn, async (req, res) => {
    try {
      await Post.findByIdAndRemove(req.params.postId);

      return res.send("Post has been deleted");
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // create a new post
  app.post("/api/posts/new", isLoggedIn, async (req, res) => {
    // console.log(req.body);
    // console.log(req.user);
    const { name } = req.user.bio;
    try {
      const newPost = await new Post({
        ...req.body,
        user: { name, id: req.user.id }
      });
      newPost.save();
      //   console.log(newPost);
      await req.user.posts.push(newPost);
      await req.user.save();
      return res.send(newPost);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  });
};
