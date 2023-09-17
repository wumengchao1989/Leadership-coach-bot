const illustrateChatGroups = require("../../models/coachChatGroup");
const { speechToText } = require("../speech2text");

async function getIllustrateChatGroups(req, res) {
  const { id } = req.query;
  console.log(id);
  let chatGroupsList = [];
  if (id) chatGroupsList = await illustrateChatGroups.findById(id);
  res.json({
    success: true,
    res: chatGroupsList,
  });
}
async function addIllustrateChatGroups(req, res) {
  const { chatGroupTitle } = req.body;
  const existsChatGroups = await illustrateChatGroups.findOne({
    chatGroupTitle,
  });
  if (existsChatGroups) {
    res.json({
      success: true,
      res: existsChatGroups,
    });
  } else {
    let newChatGroups = new illustrateChatGroups({ chatGroupTitle });
    await newChatGroups.save();
    res.json({
      success: true,
      res: newChatGroups,
    });
  }
}

async function sendIllustrateMessage(req, res) {
  const { bolbName, chatGroupId } = req.body;
  await speechToText(bolbName, chatGroupId);
  res.json({
    success: true,
  });
}

module.exports = {
  addIllustrateChatGroups,
  getIllustrateChatGroups,
  sendIllustrateMessage,
};
