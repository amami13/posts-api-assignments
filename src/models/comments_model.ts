import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
  postId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  message: String,
  owner: {
    type: String,
    required: true,
  },
});

const commentModel = mongoose.model("Comments", commentSchema);

export default commentModel;