/*
 * @Author: LAPTOP-P7G9LM4M\wumen 332982129@qq.com
 * @Date: 2023-07-15 15:22:08
 * @LastEditors: LAPTOP-P7G9LM4M\wumen 332982129@qq.com
 * @LastEditTime: 2023-08-13 19:26:45
 * @FilePath: \chaofun-frontc:\Users\wumen\Documents\msdocs-nodejs-mongodb-azure-sample-app\utils\constants.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const fs = require("fs");
const path = require("path");
const roleMap = {
  assistant: "assistant",
  user: "user",
  system: "system",
};

const roleDescriptionAssistant = `Your name is Veronica, you are an assistant that can help customer using Panda Design. You can tell customers about how to use components in Panda Design,and for the questions not related to Panda Design, you should reject it.When responding to the following prompt, please make sure to properly style your response using Github Flavored Markdown. Use markdown syntax for things like headings, lists, colored text, code blocks, highlights etc. Make sure not to mention markdown or styling in your actual response`;
const roleDescriptionPromptCreator = `I want you to be my Prompt creator. Based on my input, which is a breif description of a react component or its prop description, you will create a revised Prompt (you will write a revised Prompt that is clear, precise, and easy to understand)
The Prompt provided by you should be in the form of a request for ChatGPT to execute, and better understand of the component and its props, and in the format of {prompt:createdPrompt}`;

const angularVersionUpdate = `Update the code to adapt to Angular 16 and output the modified file content. Follow the upgrade instructions provided below and only do necessary modification according to the upgrade instruction provided below:
1. Ensure you're using a supported version of node (v16 or v18).
2. Update TypeScript to version 4.9.3 or later.
3. Update Zone.js to version 0.13.x or later.
4. Adjust type definitions: Change (e: Event) to (e: Event|RouterEvent).
5. Update imports from '@angular/platform-browser' to '@angular/core' for makeStateKey, StateKey, and TransferState.


Please provide only the modified file content after making these updates without any instructions.`;

const assistantLabel = "Veronica";
const userLabel = "Mark";
const logAnalyser =
  "Help me analysis the err logs and if there are packages that has wrong version number,provide the npm package name list array that need to fix. Only output the name of package in the format of array without any extra instructions.";

const npmVersionFix =
  "Help me fix the version of package in the package.json according to the version list, and provide the modified file content after making these updates. ";
const roleDescriptionMap = {
  1: roleDescriptionAssistant,
  2: roleDescriptionPromptCreator,
  3: angularVersionUpdate,
  4: logAnalyser,
  5: npmVersionFix,
  6: "You are an instructor that help employees learning according to the instructions below and should not response anything else. When responding to the following prompt, please make sure to properly style your response using Github Flavored Markdown. Use markdown syntax for things like headings, lists, colored text, code blocks, highlights etc. Make sure not to mention markdown or styling in your actual response",
};

const phaseMap = {
  updateFile: "0",
  npmInstall: "1",
  build: "2",
  test: "3",
  finished: "4",
};

module.exports = {
  roleMap,
  assistantLabel,
  userLabel,
  roleDescriptionMap,
  phaseMap,
};
