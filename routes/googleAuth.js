const passport = require("passport");
require("../services/googleAuthPassport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
       
      // Successful authentication, redirect home.
      res.redirect('/posts')
    //   res.send(req.user);
    }
  );
};
