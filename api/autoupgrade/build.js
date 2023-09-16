const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

const id = "00000001";

const logPath = path.resolve(`./build_logs/log-${id}`);
const errLogPath = path.resolve(`./build_logs/log-err-${id}`);
const installLogPath = path.resolve(`./build_logs/install-log-${id}`);
const installErrLogPath = path.resolve(`./build_logs/install-log-err-${id}`);
const buildLogStream = fs.createWriteStream(logPath);
const errLogStream = fs.createWriteStream(errLogPath);
const installLogStream = fs.createWriteStream(installLogPath);
const installErrLogStream = fs.createWriteStream(installErrLogPath);
const { keyv } = require("../../utils/keyv_cache");
const { phaseMap } = require("../../utils/constants");

const triggerInstall = (req, res) => {
  fs.writeFileSync(installLogPath, "");
  fs.writeFileSync(installErrLogPath, "");
  const stream = exec(
    "cd project && npm install --legacy-peer-deps --loglevel verbose"
  );
  stream.stderr.on("data", (data) => {
    installErrLogStream.write(data);
  });
  stream.stdout.on("data", (data) => {
    installLogStream.write(data);
  });
  stream.stdout.on("close", async () => {
    installLogStream.close();
    await keyv.set("progressPhase", phaseMap["build"]);
  });
  stream.stderr.on("close", async () => {
    installErrLogStream.close();
    await keyv.set("progressPhase", phaseMap["build"]);
  });

  res.json({
    success: true,
    res: {
      id,
    },
  });
};

const getInstallLogs = (req, res) => {
  const logPath = path.resolve(`./build_logs/install-log-${id}`);
  const errlogPath = path.resolve(`./build_logs/install-log-err-${id}`);
  const fileContent = fs.readFileSync(logPath);
  const fileErrContent = fs.readFileSync(errlogPath);
  res.json({
    success: true,
    res: { installLogs: fileErrContent.toString() + fileContent.toString() },
  });
};

const triggerBuild = (req, res) => {
  const stream = exec("cd project && npm run build");
  stream.stderr.on("data", (data) => {
    errLogStream.write(data);
  });
  stream.stdout.on("data", (data) => {
    buildLogStream.write(data);
  });
  stream.stdout.on("close", async () => {
    buildLogStream.close();
    await keyv.set("progressPhase", phaseMap["test"]);
  });
  stream.stderr.on("close", async () => {
    errLogStream.close();
    await keyv.set("progressPhase", phaseMap["test"]);
  });
  res.json({
    success: true,
    res: {
      id,
    },
  });
};

const getBuildLogs = (req, res) => {
  const errlogPath = path.resolve(`./build_logs/log-err-${id}`);
  const logPath = path.resolve(`./build_logs/log-${id}`);
  const fileContent = fs.readFileSync(logPath);
  const fileErrContent = fs.readFileSync(errlogPath);
  res.json({
    success: true,
    res: { buildLogs: fileContent.toString()+fileErrContent.toString() },
  });
};

const get_progress_phase = async (req, res) => {
  const phase = await keyv.get("progressPhase");
  res.json({
    success: true,
    result: {
      phase,
    },
  });
};

module.exports = {
  triggerBuild,
  getBuildLogs,
  getInstallLogs,
  triggerInstall,
  get_progress_phase,
};
