const passport = require("passport"),
  mongoose = require("mongoose"),
  TwitterStrategy = require("passport-twitter").Strategy, // api - https://developer.twitter.com/en/apps , https://stackoverflow.com/questions/55284254/twitter-creating-app-failed-due-to-invalid-web-url , https://stackoverflow.com/questions/22627083/can-we-get-email-id-from-twitter-oauth-api
  keys = require("../config/keys"),
  User = require("../models/User");

passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.twitterConsumerKey,
      consumerSecret: keys.twitterConsumerSecret,
      callbackURL: "/auth/twitter/callback",
    },
    async (token, tokenSecret, profile, done) => {
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      console.log(profile);

      const { id, username, email } = profile;
      //   console.log("===================")
      //     console.log( profile)
      try {
        const foundUser = await User.findOne({ "twitter.id": id });
        // console.log(foundUser);

        if (foundUser) {
          return done(null, foundUser);
        }
        const newUser = await new User({
          twitter: {
            id: id,
            email: email || "not specified",
            name: username,
            token,
          },
          bio: { name: username, email: email || "not specified" },
        }).save();
        return done(null, newUser);
      } catch (err) {
        console.log("===================");
        console.error(err);
        return done(err);
      }
    }
  )
);
