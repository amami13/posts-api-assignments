import mongoose, { Schema, Document, Model } from "mongoose";
import { IPost } from "./Post";

export interface IComment extends Document {
    message: string;
    sender: string;
    postId: IPost["_id"];
}

const commentSchema: Schema = new Schema({
    message: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        required: true,
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
});

const Comment: Model<IComment> = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
