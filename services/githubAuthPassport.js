const passport = require("passport"),
  GitHubStrategy = require("passport-github").Strategy, // github auth app - https://github.com/settings/applications/1231665
  keys = require("../config/keys"),
  User = require("../models/User");

passport.use(
  new GitHubStrategy(
    {
      clientID: keys.githubClientId,
      clientSecret: keys.githubClientSecret,
      callbackURL: "/auth/github/callback"
    },
   async (accessToken, refreshToken, profile, done) => {
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      // console.log(profile);

      const { id, displayName, _json: { email } } = profile;
        // console.log( profile._json.email)
      try {
        const foundUser = await User.findOne({ "github.id": id });
        // console.log(foundUser);

        if (foundUser) {
          return done(null, foundUser);
        }
        const newUser = await new User({
          github: {
            id: id,
            email: email || 'not specified',
            name: displayName,
            token: accessToken
          },
          bio: { name: displayName, email: email || 'not specified'}
        }).save();
        return done(null, newUser);
      } catch (err) {
        console.error(err);
        return done(err);
      }
    }
  )
);
