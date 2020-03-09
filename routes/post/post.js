const mongoose = require("mongoose").set("debug", true);
const Post = mongoose.model("posts");
const User = mongoose.model("users");

module.exports = app => {
  // get a list of all posts
  app.get("/api/posts", async (req, res) => {
    try {
      const foundPosts = await Post.find();
      console.log(foundPosts);
      return res.send(foundPosts);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  });

  app.get("/api/user/:userId/posts", async (req, res) => {
    // console.log(req.params.userId);
    try {
      const foundUser = await User.findById(req.params.userId)
        .populate({
          path: "posts",
          model: Post
        })
        .exec();
      //   console.log(foundUser)
      return res.send(foundUser.posts);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  });

  // create a new post
  app.post("/api/posts/new", async (req, res) => {
    // console.log(req.body);
    console.log(req.user);
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
