import express, { Request, Response } from 'express';
import Post, { IPost } from '../models/Post';

const router = express.Router();

// Create a new post
router.post("/post", async (req: Request, res: Response) => {
    const { title, sender, content }: IPost = req.body;

    if (!title || !sender || !content) {
        return res.status(400).json({ message: "Title, sender, and content are required" });
    }

    try {
        const newPost = new Post({ title, sender, content });
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: `Error saving post: ${error}`, error });
    }
});

// Fetch all posts
router.get("/posts", async (_req: Request, res: Response) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts", error });
    }
});

// Fetch posts by sender
router.get("/post", async (req: Request, res: Response) => {
    const { sender } = req.query;

    try {
        const posts = await Post.find({ sender });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts", error });
    }
});

// Fetch a post by ID
router.get("/post/:id", async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: "Error fetching post", error });
    }
});

// Update a post by ID
router.put("/post/:id", async (req: Request, res: Response) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: "Error updating post", error });
    }
});

export default router;
