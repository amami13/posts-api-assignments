import commentsModel, { IComments } from "../models/comments_model";
import { Request, Response } from "express";
import BaseController from "./base_controller";

class commentsController extends BaseController<IComments> {
    constructor() {
        super(commentsModel);
    }

    async create(req: Request, res: Response) {
        const userId = req.params.userId;
        const post = {
            ...req.body,
            owner: userId
        }
        req.body = post;
        super.create(req, res);
    };
}


export default new commentsController();