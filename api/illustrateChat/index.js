const illustrateChatGroups = require("../../models/illustrateChatGroup");
const { speechToText } = require("../speech2text");

async function getIllustrateChatGroups(req, res) {
  const { id } = req.query;
  let chatGroupsList;
  if (!id) {
    chatGroupsList = await illustrateChatGroups.find();
  } else {
    chatGroupsList = await illustrateChatGroups.findById(id);
  }
  res.json({
    success: true,
    res: chatGroupsList,
  });
}
async function addIllustrateChatGroups(req, res) {
  const { chatGroupTitle } = req.body;
  let newChatGroups = new illustrateChatGroups({ chatGroupTitle });
  await newChatGroups.save();
  res.json({
    success: true,
    res: newChatGroups,
  });
}

async function sendIllustrateMessage(req, res) {
  const { bolbName } = req.body;
  await speechToText(bolbName);
  res.json({
    success: true,
  });
}

module.exports = {
  addIllustrateChatGroups,
  getIllustrateChatGroups,
  sendIllustrateMessage,
};
