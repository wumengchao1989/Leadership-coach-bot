/*
 * @Author: LAPTOP-P7G9LM4M\wumen 332982129@qq.com
 * @Date: 2023-07-08 08:52:22
 * @LastEditors: LAPTOP-P7G9LM4M\wumen 332982129@qq.com
 * @LastEditTime: 2023-08-12 20:39:47
 * @FilePath: \chaofun-frontc:\Users\wumen\Documents\msdocs-nodejs-mongodb-azure-sample-app\routes\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var express = require("express");

var router = express.Router();
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

const {
  getFileList,
  getFileContent,
  getDiffHtmlString,
  getGitFileStatus,
} = require("../api/autoupgrade/file");

const { createPrompt } = require("../api/promptCreator");
const {
  triggerBuild,
  getBuildLogs,
  getInstallLogs,
  triggerInstall,
  get_progress_phase,
} = require("../api/autoupgrade/build");
const {
  getCypressTestLogs,
  triggerCypressTest,
} = require("../api/autotest/runtest");
const {
  triggerUpgrade,
  getUpdateProgress,
} = require("../api/autoupgrade/upgradeCompletion");
const { textToSpeech } = require("../api/text2speech");
const {
  addIllustrateChatGroups,
  getIllustrateChatGroups,
  sendIllustrateMessage,
} = require("../api/illustrateChat");

router.post("/api/send_request", send_request);
router.get("/api/get_chat_groups", getChatGroups);
router.post("/api/add_chat_groups", addChatGroups);
router.post("/api/delete_chat_groups", deleteChatGroups);
router.post("/api/generate_embeddings", generateEmbeddings);
router.post("/api/generate_component_embeddings", generateComponentEmbeddings);
router.post("/api/create_prompt", createPrompt);

router.get("/api/autoupgrade/get_file_list", getFileList);
router.get("/api/autoupgrade/get_file_content", getFileContent);
router.get("/api/autoupgrade/get_diff_html_string", getDiffHtmlString);
router.post("/api/autoupgrade/trigger_build", triggerBuild);
router.get("/api/autoupgrade/get_build_logs", getBuildLogs);
router.get("/api/autotest/get_cypress_test_logs", getCypressTestLogs);
router.post("/api/autotest/trigger_cypress_test", triggerCypressTest);
router.post("/api/autoupgrade/trigger_upgrade", triggerUpgrade);
router.get("/api/autoupgrade/get_git_file_status", getGitFileStatus);
router.get("/api/autoupgrade/get_update_progress", getUpdateProgress);
router.get("/api/aiinstructor/texttospeech", textToSpeech);
router.get("/api/autoupgrade/get_install_logs", getInstallLogs);
router.post("/api/autoupgrade/trigger_install", triggerInstall);
router.get("/api/autoupgrade/get_progress_phase", get_progress_phase);
router.post(
  "/api/illustarte/add_illustrate_chat_groups",
  addIllustrateChatGroups
);
router.get(
  "/api/illustrate/get_illustrate_chat_groups",
  getIllustrateChatGroups
);

router.post("/api/illustarte/send_illustrate_message", sendIllustrateMessage);
module.exports = router;
