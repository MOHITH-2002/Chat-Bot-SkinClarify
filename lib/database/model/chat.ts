import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true, // Adding an index for faster querying by userId
    },
    history: [
      {
        role: {
          type: String,
          enum: ["user", "model"],
          required: true,
        },
        parts: [
          {
            text: {
              type: String,
              required: true,
            },
            img: {
              type: String,
              required: false,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models?.Chat || mongoose.model("Chat", chatSchema);
