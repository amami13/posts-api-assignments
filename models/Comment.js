const mongoose = require("mongoose");
const {Post} = require("./Post")

    const commentSchema = new mongoose.Schema({
        message: {
          type: String,
          required: true,
        },
        sender: {
          type: String,
          required: true,
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
          },
      });

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;