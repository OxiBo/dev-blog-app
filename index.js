const express = require("express"),
  keys = require("./config/keys"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
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

app.get("/", (req, res) => {
  res.send({ greeting: "Hello, blog" });
});

const PORT = process.env.PORT || 6060;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
