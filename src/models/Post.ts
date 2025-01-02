import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPost extends Document {
    title: string;
    sender: string;
    content: string;
}

const postSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 50,
    },
    sender: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

const Post: Model<IPost> = mongoose.model<IPost>("Post", postSchema);

export default Post;
