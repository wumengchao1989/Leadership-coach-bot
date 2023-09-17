const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const illustrateChatMessage = new Schema({
  message: {
    type: String,
    required: true,
  },
  bolbUrl: {
    type: String,
    required: true,
  },
  bolbName: {
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
const illustrateChatGroupSchema = new Schema({
  chatGroupTitle: {
    type: String,
    required: true,
  },
  chatMessages: {
    type: [illustrateChatMessage],
    required: true,
    default: [],
  },
});

module.exports = mongoose.model("coachChatGroup", illustrateChatGroupSchema);
