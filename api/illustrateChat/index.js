const illustrateChatGroups = require("../../models/coachChatGroup");
const { speechToText, generateInitResponse } = require("../speech2text");
const { keyv } = require("../../utils/keyv_cache");
const fs = require("fs");

async function getIllustrateChatGroups(req, res) {
  const { id } = req.query;
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
  const { bolbName, chatGroupId, isInit } = req.body;
  if (isInit) {
    await generateInitResponse(chatGroupId);
  } else {
    await keyv.set(chatGroupId, true);
    await speechToText(bolbName, chatGroupId);
  }
  res.json({
    success: true,
  });
}
async function resetIllustrateMessages(res, res) {
  await illustrateChatGroups.updateMany({
    chatMessages: [],
  });
  const audioDownloadedPath = path.resolve("./public/audio");
  if (fs.existsSync(audioDownloadedPath)) {
    const fileList = fs.readdirSync(audioDownloadedPath);
    for await (let file of fileList) {
      var pathname = path.join(audioDownloadedPath, file);
      if (file.indexOf("init") !== -1) {
        fs.unlinkSync(pathname);
      }
    }
  }
  res.json({ success: true });
}

module.exports = {
  resetIllustrateMessages,
  addIllustrateChatGroups,
  getIllustrateChatGroups,
  sendIllustrateMessage,
};
