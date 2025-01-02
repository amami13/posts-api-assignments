import express from "express";
const router = express.Router();
import postsController from "../controllers/postsController";

router.get("/", postsController.getAllPosts);

router.get("/:id", postsController.getPostById);

router.post("/", postsController.createPost);

router.delete("/:id", postsController.deletePost);

export default router;