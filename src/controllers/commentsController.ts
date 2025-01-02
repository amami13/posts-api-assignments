import express, { Request, Response } from "express";
import Comment, { IComment } from "../models/Comment";

const router = express.Router();

// Create a new comment
router.post("/comment", async (req: Request, res: Response) => {
    const { message, sender, postId }: IComment = req.body;

    if (!message || !sender || !postId) {
        return res.status(400).json({ message: "Message, sender, and postId are required" });
    }

    try {
        const newComment = new Comment({ message, sender, postId });
        await newComment.save();

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: "Error saving comment", error });
    }
});

// Fetch all comments
router.get("/comment", async (_req: Request, res: Response) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments", error });
    }
});

// Fetch all comments for a post
router.get("/comment/:postId", async (req: Request, res: Response) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments", error });
    }
});

// Update an existing comment
router.put("/comment/:commentId", async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const { message, sender, postId }: IComment = req.body;

    if (!message || !sender || !postId) {
        return res.status(400).json({ message: "Message, sender, and postId are required" });
    }

    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { message, sender, postId },
            { new: true, runValidators: true }
        );

        if (!updatedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: "Error updating comment", error });
    }
});

// Delete an existing comment
router.delete("/comment/:commentId", async (req: Request, res: Response) => {
    const { commentId } = req.params;

    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting comment", error });
    }
});

export default router;
