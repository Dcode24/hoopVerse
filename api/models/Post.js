// Importing Mongoose library
const mongoose = require("mongoose");

// Destructuring Schema and model from Mongoose
const { Schema, model } = mongoose;

// Defining the schema for a Post
const PostSchema = new Schema(
  {
    title: String, // Title of the post
    summary: String, // Summary or brief description of the post
    content: String, // Content or main body of the post
    cover: String, // URL or path for the post cover image
    author: { type: Schema.Types.ObjectId, ref: "User" }, // Reference to the User who authored the post
  },
  {
    timestamps: true, // Automatically adds timestamps (createdAt, updatedAt) for each post
  }
);

// Creating a model for the Post schema
const PostModel = model("Post", PostSchema);

// Exporting the Post model to use it in other parts of the application
module.exports = PostModel;
