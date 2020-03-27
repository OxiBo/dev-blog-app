const passport = require("passport");
require("../../services/twitterAuthPassport");
// https://www.freecodecamp.org/news/how-to-set-up-twitter-oauth-using-passport-js-and-reactjs-9ffa6f49ef0/

module.exports = app => {
  app.get("/auth/twitter", passport.authenticate("twitter"));

  app.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", { failureRedirect: "/" }),
    (req, res) => {
      // Successful authentication, redirect home.
      res.redirect("/posts");
    }
  );
};
