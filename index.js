const express = require("express"),
  keys = require("./config/keys"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  cookieSession = require("cookie-session"),
  mongoose = require("mongoose"),
  User = require("./models/User"),
  Post = require("./models/Post"),
  Comment = require("./models/Comment"),
  isLoggedIn = require("./middleware/isLoggedin"),
  app = express();

app.use(cors()); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options. ; https://en.wikipedia.org/wiki/Cross-origin_resource_sharing   , https://www.udemy.com/course/node-with-react-fullstack-web-development/learn/lecture/7605040?start=667#bookmarks
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// database configuration
try {
  mongoose.connect(keys.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  });
  console.log("Connected to DB!");
} catch (err) {
  console.log("ERROR:", err.message);
}

app.use(
  cookieSession({
    name: "session", // default value
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    keys: [keys.cookieKey]
  })
);
// app.use(['/api/posts', "/api/user/:userId/posts"], isLoggedIn)

// passport
app.use(passport.initialize()); // has to be put before requiring auth routes
app.use(passport.session()); // has to be put before requiring auth routes

//requiring routes
require("./routes/auth/googleAuth")(app);
require("./routes/auth/githubAuth")(app);
require("./routes/auth/twitterAuth")(app);
require("./routes/auth/auth")(app);
require("./routes/profile/profile")(app);
require("./routes/post/post")(app);
require("./routes/comments/comments")(app);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  try {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  } catch (err) {
    done(new Error("Failed to deserialize user"));
  }
});

app.get("/", (req, res) => {
  console.log("============= REQ.USER ===========");
  console.log(req.user);

  res.send({ greeting: "Hello, blog" });
});

const PORT = process.env.PORT || 6060; // if getting error about server already running on this port - https://stackoverflow.com/questions/9898372/how-to-fix-error-listen-eaddrinuse-while-using-nodejs
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
