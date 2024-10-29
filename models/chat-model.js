import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      reqired: true,
    },
    messages: {
      type: [],
      default: [],
    },
  },
  { timestamps: true }
);

const ChatModel = mongoose.models.chats || mongoose.model("chats", chatSchema);
export default ChatModel;
