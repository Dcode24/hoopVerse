// Required packages/modules
const express = require("express"); // Express.js framework
const cors = require("cors"); // CORS middleware
require("dotenv").config();
const mongoose = require("mongoose"); // Mongoose for MongoDB interactions
const User = require("./models/User"); // User model
const Post = require("./models/Post"); // Post model
const bcrypt = require("bcryptjs"); // Password hashing
const jwt = require("jsonwebtoken"); // JSON Web Token handling
const cookieParser = require("cookie-parser"); // Parsing cookies
const multer = require("multer"); // Middleware for handling file uploads
const uploadMiddleware = multer({ dest: "uploads/" }); // Upload middleware configuration
const fs = require("fs"); // File system module

// Constants
const salt = bcrypt.genSaltSync(10); // Salt for password hashing
const secret = "sdfgdfsdassfghgjgfdsadsfgh"; // Secret for JWT

// Express app instance
const app = express();

// Middleware setup
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); // CORS configuration
app.use(express.json()); // JSON body parser
app.use(cookieParser()); // Cookie parsing
app.use("/uploads", express.static(__dirname + "/uploads")); // Serving uploaded files

// MongoDB connection
mongoose.connect(process.env.DATABASE_URI);
// User registration endpoint
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

// User login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
    // res.json
  } else {
    res.status(400).json("Wrong credentials");
  }
});
// Profile retrieval endpoint
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});
// User logout endpoint
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

// Post creation endpoint
app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
});
// Post update endpoint
app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("you are not the author");
    }
    await postDoc.update({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });
    res.json(postDoc);
  });
});

// Fetching posts endpoint
app.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

// Fetching a specific post by ID endpoint
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

// Server listening on port 4000
app.listen(4000);
