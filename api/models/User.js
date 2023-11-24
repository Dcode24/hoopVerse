// Importing Mongoose library
const mongoose = require("mongoose");

// Destructuring Schema and model from Mongoose
const { Schema, model } = mongoose;

// Defining the schema for a User

const UserSchema = new Schema({
  username: { type: String, required: true, min: 4, unique: true }, // Username field with validation for required, minimum length, and uniqueness
  password: { type: String, required: true }, // Password field with validation for required attribute
});

// Creating a model for the User schema
const UserModel = model("User", UserSchema);

// Exporting the User model to use it in other parts of the application
module.exports = UserModel;
