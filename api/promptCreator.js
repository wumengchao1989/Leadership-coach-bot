/*
 * @Author: LAPTOP-P7G9LM4M\wumen 332982129@qq.com
 * @Date: 2023-07-15 15:43:09
 * @LastEditors: LAPTOP-P7G9LM4M\wumen 332982129@qq.com
 * @LastEditTime: 2023-08-12 20:35:19
 * @FilePath: \chaofun-frontc:\Users\wumen\Documents\msdocs-nodejs-mongodb-azure-sample-app\api\promptCreator.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const {
  azure_chat_deployment_name,
  azure_chatapi,
} = require("../chatgpt/index");
const chatGroups = require("../models/chatGroups.js");
const {
  roleMap,
  assistantLabel,
  userLabel,
  roleDescriptionMap,
} = require("../utils/constants");
const { getFiles } = require("./autoupgrade/file");

async function createPrompt(req, res) {
  const filePathTree = getFiles(path.resolve("./project"));

  const roleDescription = roleDescriptionMap["3"];
  const conversionInfo = [
    { role: roleMap.system, content: roleDescription },
    { role: roleMap.user, content: democode },
  ];
  try {
    // const completion = await azure_chatapi.getChatCompletions(
    //   azure_chat_deployment_name,
    //   conversionInfo
    // );
    res.json({
      success: true,
      res: filePathTree,
    });
  } catch (err) {
    res.json({
      success: false,
      res: err,
    });
  }
}

module.exports = { createPrompt };
