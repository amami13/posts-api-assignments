import commentModel from "../models/comments_model";
import { Request, Response } from "express";

const getAllcomments = async (req: Request, res: Response) => {
  const filter = req.query.owner;
  try {
    if (filter) {
      const comments = await commentModel.find({ owner: filter });
      res.send(comments);
    } else {
      const comments = await commentModel.find();
      res.send(comments);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const getcommentById = async (req: Request, res: Response) => {
  const commentId = req.params.id;
  try {
    const comment = await commentModel.findById(commentId);
    if (comment != null) {
      res.send(comment);
    } else {
      res.status(404).send("comment not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const createcomment = async (req: Request, res: Response) => {
  const commentBody = req.body;
  try {
    const comment = await commentModel.create(commentBody);
    res.status(201).send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deletecomment = async (req: Request, res: Response) => {
  const commentId = req.params.id;
  try {
    const rs = await commentModel.findByIdAndDelete(commentId);
    res.status(200).send(rs);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updatecomment = async (req: Request, res: Response) => {
    const commentId = req.params.id;
    const commentBody = req.body;
    try {
        const comment = await commentModel.findByIdAndUpdate(commentId, commentBody, { new: true });
        if (!comment) {
            return res.status(404).send({ message: "comment not found" });
        }
        res.send(comment);
    } catch (error) {
        res.status(400).send(error);
    }
};



export default {
  getAllcomments,
  createcomment,
  deletecomment,
  getcommentById,
  updatecomment,
};