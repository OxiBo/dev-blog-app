const mongoose = require("mongoose").set("debug", true);
const Post = mongoose.model("posts");

module.exports = app => {
    // get a list of all posts
  app.get("/api/posts", async (req, res) => {
    try {
      const foundPosts = await Post.find();
      return res.send(foundPosts);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  });

  // create a new post
  app.post("/api/posts/new", async (req, res) => {
      console.log(req.body)
    try {
    //   const newPost = await new Post( req.body.post);
      return res.send("new post");
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  });
};
