const express = require("express");

const router = express.Router();
const {
  send_request,
  getChatGroups,
  addChatGroups,
  deleteChatGroups,
} = require("../api/openai");
const {
  generateComponentEmbeddings,
  generateEmbeddings,
} = require("../api/embedding");

const { textToSpeech } = require("../api/text2speech");
const {
  addIllustrateChatGroups,
  getIllustrateChatGroups,
  sendIllustrateMessage,
} = require("../api/illustrateChat");

router.post("/api/coach/send_request", send_request);
router.get("/api/coach/get_chat_groups", getChatGroups);
router.post("/api/coach/add_chat_groups", addChatGroups);
router.post("/api/coach/delete_chat_groups", deleteChatGroups);
router.post("/api/coach/generate_embeddings", generateEmbeddings);
router.post(
  "/api/coach/generate_component_embeddings",
  generateComponentEmbeddings
);
router.get("/api/coach/aiinstructor/texttospeech", textToSpeech);

router.post(
  "/api/coach/illustarte/add_illustrate_chat_groups",
  addIllustrateChatGroups
);
router.get(
  "/api/coach/illustrate/get_illustrate_chat_groups",
  getIllustrateChatGroups
);

router.post(
  "/api/coach/illustarte/send_illustrate_message",
  sendIllustrateMessage
);
module.exports = router;
