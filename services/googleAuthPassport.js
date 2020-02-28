const passport = require("passport"),
  GoogleStrategy = require("passport-google-oauth20").Strategy,
  keys = require("../config/keys"),
  User = require("../models/User");

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });

// https://console.developers.google.com/apis/dashboard?project=our-mechanism-252021&pli=1
// https://www.udemy.com/course/react-redux/learn/lecture/12700577?start=51#bookmarks
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      //   console.log(profile);
      //   console.log(accessToken)
      const { id, displayName, emails } = profile;
      //   console.log( emails[0].value)
      try {
        const foundUser = await User.findOne({ "google.id": id  });
        // console.log(foundUser);

        if (foundUser) {
          return done(null, foundUser);
        }
        const newUser = await new User({
          google: {
            id: id,
            email: emails[0].value,
            name: displayName,
            token: accessToken
          }
        }).save();
        return done(null, newUser);
      } catch (err) {
        console.error(err);
        return done(err);
      }

      //   User.findOrCreate({ googleId: profile.id }, function(err, user) {
      //     return cb(err, user);
      //   });
    }
  )
);
