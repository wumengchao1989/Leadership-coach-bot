const fs = require("fs-extra");
const path = require("path");
const projectPath = path.resolve("./project");
const git = require("simple-git");
const gitRepoPath = path.resolve("./project");
const Diff2html = require("diff2html");
const gitHandler = git(gitRepoPath);
const { keyv } = require("../../utils/keyv_cache");

const ignoreList = [
  "node_modules",
  "dist",
  ".vscode",
  ".angular",
  ".git",
  "cypress",
  "package-lock.json",
  ".gitignore",
  ".editorconfig",
  "cypress.config.ts",
  "README.md",
  ".scss",
  ".html",
  ".ico",
  "assets",
  ".cy.ts",
];

const getFiles = async (filePath, hasGitStatus) => {
  const fileList = fs.readdirSync(filePath);
  const resFileList = [];
  for (let item of fileList) {
    let shouldPass = false;
    for (let ignoreItem of ignoreList) {
      if (item.indexOf(ignoreItem) !== -1) {
        shouldPass = true;
      }
    }
    if (shouldPass) continue;
    const itemFilePath = path.join(filePath, item);
    let isModified = false;
    let isCurrentHandling = false;
    if (fs.lstatSync(itemFilePath).isDirectory()) {
      resFileList.push({
        title: item,
        children: await getFiles(itemFilePath, hasGitStatus),
        key: itemFilePath,
      });
    } else {
      if (hasGitStatus) {
        const statusInfo = await gitHandler.status();
        const currentHandlingPath = await keyv.get("currentHandling");
        const modifiedList = statusInfo.modified;
        for (let modifiedPath of modifiedList) {
          if (
            path.resolve(__dirname, "../../", "project", modifiedPath) ===
            path.resolve(itemFilePath)
          ) {
            isModified = true;
          }
        }
        if (itemFilePath === currentHandlingPath) {
          isCurrentHandling = true;
        }
        resFileList.push({
          title: item,
          isLeaf: true,
          key: itemFilePath,
          isModified,
          isCurrentHandling,
        });
      } else {
        resFileList.push({
          title: item,
          isLeaf: true,
          key: itemFilePath,
          isModified,
        });
      }
    }
  }
  return resFileList;
};
const getFileList = async (req, res) => {
  const fullFileList = await getFiles(projectPath, true);
  res.json({
    success: true,
    res: fullFileList,
  });
};

const getFileContent = (req, res) => {
  const { path } = req.query;
  let fileContent = "";
  try {
    if (path) {
      fileContent = fs.readFileSync(path[0]).toString();
      res.json({
        success: true,
        res: fileContent,
      });
    }
  } catch (err) {
    res.json({
      success: false,
      res: err,
    });
  }
};

const getGitFileStatus = async (req, res) => {
  const { path } = req.query;
  const statusInfo = await gitHandler.status();
  res.json({
    success: true,
    res: {
      statusInfo,
    },
  });
};

const getDiffHtmlString = async (req, res) => {
  const { path } = req.query;
  const diff = await gitHandler.diff(path ? [path] : ["main", "ai-upgrade"]);
  const diffJson = Diff2html.parse(diff);
  const diffHtml = Diff2html.html(diffJson, {
    drawFileList: true,
    outputFormat: "side-by-side",
    drawFileList: false,
  });
  res.json({
    success: true,
    res: diffHtml,
    diff,
  });
};

module.exports = {
  getFiles,
  getFileList,
  getFileContent,
  getDiffHtmlString,
  getGitFileStatus,
};
