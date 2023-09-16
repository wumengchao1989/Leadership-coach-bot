const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const chatMessage = new Schema({
  message: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    required: true,
  },
  reverse: {
    type: Boolean,
    retuired: true,
  },
  userName: {
    type: String,
    required: true,
  },
});
const chatGroupSchema = new Schema({
  chatGroupTitle: {
    type: String,
    required: true,
  },
  chatMessages: {
    type: [chatMessage],
    required: true,
    default: [],
  },
});

module.exports = mongoose.model("chatGroups", chatGroupSchema);
