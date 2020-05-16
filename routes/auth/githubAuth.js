// https://medium.com/@vampiire/how-to-verify-the-authenticity-of-a-github-apps-webhook-payload-8d63ccc81a24

const passport = require("passport");
require("../../services/githubAuthPassport");

module.exports = app => {
  app.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["profile", "user:email"] })
  );

  app.get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/" }),
    (req, res) => {
       
      // Successful authentication, redirect home.
      res.redirect('/posts')
    //   res.send(req.user);
    }
  );
};

