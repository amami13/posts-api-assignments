// Anastasia-Tihonov-323430595-Amit-Avisar-212374573
// we used dotenv and I left it here if we wont use the .env file we can delete later :)
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const app = express();
const postsRoutes = require("./controllers/postsController");
const commentsRoutes = require("./controllers/commentsController");

mongoose
  .connect(
    "mongodb://localhost:27017/postsAPI",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
  });

app.use(
  session({
    secret: "bvfhefbiuefheiufh", // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use files in modules directory they need to be imported in the start of the file
app.use("/", postsRoutes);
app.use("/", commentsRoutes);


// set the port the app will run in
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

