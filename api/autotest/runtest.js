const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const { keyv } = require("../../utils/keyv_cache");

const triggerCypressTest = (req, res) => {
  const id = "00000001";
  const logPath = path.resolve(`./test_logs/log-${id}`);
  const testLogStream = fs.createWriteStream(logPath);
  const stream = exec("npm run cy:run");
  stream.stdout.on("open", () => {
    console.log("open");
  });
  stream.stdout.on("data", (data) => {
    testLogStream.write(data);
  });
  stream.stdout.on("close", async () => {
    testLogStream.close();
    await keyv.set("progressPhase", "4");
  });
  res.json({
    success: true,
    res: {
      id,
    },
  });
};

const getCypressTestLogs = (req, res) => {
  const id = "00000001";
  const logPath = path.resolve(`./test_logs/log-${id}`);
  const fileContent = fs.readFileSync(logPath);
  const fileContentStr = fileContent.toString();
  const pos = fileContentStr.indexOf("=======");
  let resStr = "test running...";
  if (pos !== -1) resStr = fileContentStr.substring(pos, fileContentStr.length);
  res.json({
    success: true,
    res: {
      testLogs: resStr,
    },
  });
};

module.exports = { triggerCypressTest, getCypressTestLogs };
