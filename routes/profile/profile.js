const mongoose = require("mongoose").set("debug", true);
const User = mongoose.model("users");
module.exports = app => {
  app.get("/api/user-profile/:userId", async (req, res) => {
    try {
      const foundUser = await User.findById(req.params.userId);
      if (foundUser) {
        return res.send(foundUser);
      }
      return res.status(404).send({ error: "User not found" });
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

  app.patch("/api/user-profile/:userId/edit", async (req, res) => {
      console.log(req.body)
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.userId, {bio: req.body});
      return res.send(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
};
