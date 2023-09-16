const {
  azure_chat_deployment_name,
  azure_chatapi,
} = require("../../chatgpt/index");
const {
  roleMap,
  roleDescriptionMap,
  versionsInfo,
} = require("../../utils/constants");
const path = require("path");
const { getFiles } = require("./file");
const fs = require("fs");
const { keyv } = require("../../utils/keyv_cache");
const dayjs = require("dayjs");

async function getChatCompletions(filecontent) {
  const roleDescription = roleDescriptionMap["3"];
  const conversionInfo = [
    { role: roleMap.system, content: roleDescription },
    {
      role: roleMap.system,
      content: `Here is the package version list:${versionsInfo},you should only select available package version from the list.`,
    },
    { role: roleMap.user, content: filecontent },
  ];
  const completion = await azure_chatapi.getChatCompletions(
    azure_chat_deployment_name,
    conversionInfo
  );
  return completion;
}

async function getUpdateProgress(req, res) {
  const updatedFileList = [];
  for await (const [key, value] of keyv.iterator()) {
    const fileInfo = { key, value };
    if (key !== "currentHandling" && key !== "progressPhase") {
      updatedFileList.push(fileInfo);
    }
  }
  res.json({
    success: true,
    res: {
      updatedFileList,
    },
  });
}
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
async function triggerUpgrade(req, res) {
  const filePathTree = await getFiles(path.resolve("./project"));
  await keyv.clear();
  await keyv.set("progressPhase", "0");
  const dfs = async (pathTree, level) => {
    for await (const item of pathTree) {
      if (item && item.key && item.isLeaf) {
        try {
          await keyv.set("currentHandling", item.key);
          const content = fs.readFileSync(item.key);
          if (
            (item.key.indexOf("package.json") !== -1 ||
              item.key.indexOf("button") !== -1) &&
            item.key.indexOf("ng-package.json") === -1 &&
            item.key.indexOf("package-lock.json") === -1
          ) {
            const res = await getChatCompletions(content.toString());
            const modifiedFileContent = res.choices[0].message.content;
            fs.writeFileSync(item.key, modifiedFileContent);
          } else {
            await sleep(2000);
            if (item.key.indexOf("json") === -1)
              fs.writeFileSync(item.key, "//ai checked \n" + content);
          }
          await keyv.set("currentHandling", "");
          await keyv.set(item.key, dayjs().format("YYYY-MM-DD HH:mm:ss"));
        } catch (err) {
          console.log(err);
        }
      } else {
        if (item.children && item.children.length !== 0) {
          await dfs(item.children, level + 1);
        }
      }
    }
    if (level === 0) await keyv.set("progressPhase", "1");
  };
  dfs(filePathTree, 0);

  try {
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

module.exports = { triggerUpgrade, getUpdateProgress };
