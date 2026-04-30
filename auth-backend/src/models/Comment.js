import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },

    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post is required"],
      index: true,
    },

    // 🔥 KEY FIELD → supports nesting
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
      index: true,
    },

    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
      minlength: [1, "Comment cannot be empty"],
      maxlength: [500, "Comment too long"],
    },

    likesCount: {
      type: Number,
      default: 0,
      min: [0, "Likes cannot be negative"],
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// 🔥 INDEXES (important for performance)
commentSchema.index({ postId: 1, createdAt: -1 });
commentSchema.index({ parentCommentId: 1 });

// 🔒 VALIDATION LOGIC (VERY IMPORTANT)
commentSchema.pre("save", async function (next) {
  try {
    // If it's a reply to another comment
    if (this.parentCommentId) {
      const parentComment = await mongoose
        .model("Comment")
        .findById(this.parentCommentId);

      if (!parentComment) {
        return next(new Error("Parent comment does not exist"));
      }

      // Ensure same post (CRITICAL)
      if (parentComment.postId.toString() !== this.postId.toString()) {
        return next(new Error("Parent comment must belong to same post"));
      }
    }

    next();
  } catch (error) {
    next(error);
  }
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;l̥