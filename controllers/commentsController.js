const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

// Create a new comment
router.post("/comment", async (req, res) => {
    const { message, sender, postId } = req.body;

    if (!message || !sender || !postId) {
        return res.status(400).json({ message: "Message, sender and postId are required" });
    }

    try {
        const newComment = new Comment({ message, sender, postId });
        await newComment.save();

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: "Error saving comment", error });
    }
});

// GET route made to fetch all comments
router.get('/comment', async (req, res) => {  
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments", error });
    }
});

// Get all comments for a post
router.get("/comment/:postId", async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments", error });
    }
});


module.exports = router;