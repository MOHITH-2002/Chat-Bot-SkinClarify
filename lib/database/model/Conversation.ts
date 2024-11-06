import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['bot', 'user'],
    required: true,
  },
  
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

const conversationSchema = new mongoose.Schema({
  messages: [messageSchema], // Array of message documents
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

const Conversation= mongoose.model('Conversation', conversationSchema);
export default Conversation;