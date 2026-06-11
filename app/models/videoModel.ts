import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    PublicId: {
      type: String,
    },
    originalSize: {
      type: String,
    },
    compressedSize: {
      type: String,
    },
    duration: {
      type: Number, // Float values are stored as Number
    },
  },
  {
    timestamps: true, // createdAt & updatedAt automatically
  }
);

const Video =
  mongoose.models.Video || mongoose.model("Video", videoSchema);

export default Video;