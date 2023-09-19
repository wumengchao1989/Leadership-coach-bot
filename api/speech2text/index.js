const { containerClient } = require("../../utils/BlobService");
const path = require("path");
const fs = require("fs");
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const illustrateChatGroups = require("../../models/coachChatGroup");
const coachData = require("../../models/coachData");
const {
  azure_chat_deployment_name,
  azure_chatapi,
} = require("../../chatgpt/index");
const speechConfig = sdk.SpeechConfig.fromSubscription(
  "ac5b31c0448a4b26a2223616040fade3",
  "eastus"
);
const { roleMap, roleDescriptionMap } = require("../../utils/constants");
const { textToSpeech } = require("../text2speech");

speechConfig.speechRecognitionLanguage = "en-US";

async function generateInitResponse(chatGroupId) {
  if (!chatGroupId) return;
  const roleDescription = roleDescriptionMap["6"];
  const currentChatGroup = await illustrateChatGroups.findById(chatGroupId);
  const chatGroupTitle = currentChatGroup.chatGroupTitle;
  const coachDataList = await coachData.find({
    instructorName: chatGroupTitle,
  });
  const predefinedMessages = coachDataList.map((item) => {
    return { role: roleMap.user, content: `Instructions:${item.coachData}` };
  });
  const conversionInfo = [
    { role: roleMap.user, content: roleDescription },
    ...predefinedMessages,
    {
      role: roleMap.user,
      content: "Please tell me what you can do",
    },
  ];
  const completion = await azure_chatapi.getChatCompletions(
    azure_chat_deployment_name,
    conversionInfo
  );
  const responseMessage = {
    message: completion?.choices?.[0].message.content,
    createAt: new Date(),
    userName: currentChatGroup.chatGroupTitle,
    reverse: true,
    bolbUrl: `${chatGroupTitle}_init.wav`,
    bolbName: `${chatGroupTitle}_init.wav`,
  };
  currentChatGroup.chatMessages.push(responseMessage);
  await textToSpeech(
    completion?.choices?.[0].message.content,
    `${chatGroupTitle}_init.wav`,
    chatGroupTitle
  );
  await currentChatGroup.save();
}
async function speechToText(blobName, chatGroupId) {
  const audioDownloadedPath = path.resolve("./audioDownloaded");
  if (!fs.existsSync(audioDownloadedPath)) {
    fs.mkdirSync(audioDownloadedPath);
  }

  const savepath = path.resolve(`./audioDownloaded/${blobName}`);
  const blobClient = containerClient.getBlobClient(blobName);
  await blobClient.downloadToFile(savepath);
  const audioFile = fs.readFileSync(savepath);

  let audioConfig = sdk.AudioConfig.fromWavFileInput(audioFile, blobName);
  let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

  speechRecognizer.recognizeOnceAsync(
    async (result) => {
      if (result.privText) {
        const currentChatGroup = await illustrateChatGroups.findById(
          chatGroupId
        );
        if (currentChatGroup) {
          //from question received and generate text and save
          const message = {
            message: result.privText,
            createAt: new Date(),
            userName: "User",
            reverse: false,
            bolbUrl: blobName,
            bolbName: blobName,
          };
          currentChatGroup.chatMessages.push(message);
          await currentChatGroup.save();
          const roleDescription = roleDescriptionMap["6"];
          const coachDataList = await coachData.find({
            instructorName: currentChatGroup.chatGroupTitle,
          });
          const predefinedMessages = coachDataList.map((item) => {
            return {
              role: roleMap.user,
              content: `Instructions:${item.coachData}`,
            };
          });
          const conversionInfo = [
            { role: roleMap.user, content: roleDescription },
            ...predefinedMessages,
            {
              role: roleMap.user,
              content: result.privText,
            },
          ];
          const completion = await azure_chatapi.getChatCompletions(
            azure_chat_deployment_name,
            conversionInfo
          );
          const responseMessage = {
            message: completion?.choices?.[0].message.content,
            createAt: new Date(),
            userName: currentChatGroup.chatGroupTitle,
            reverse: true,
            bolbUrl: blobName,
            bolbName: blobName,
          };
          currentChatGroup.chatMessages.push(responseMessage);
          await textToSpeech(
            completion?.choices?.[0].message.content,
            blobName,
            currentChatGroup.chatGroupTitle
          );
          await currentChatGroup.save();
        }
      }
      speechRecognizer.close();
    },
    (err) => {
      console.log(err);
    }
  );
}

module.exports = { speechToText, generateInitResponse };
