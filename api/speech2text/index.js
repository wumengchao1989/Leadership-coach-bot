const { containerClient } = require("../../utils/BlobService");
const path = require("path");
const fs = require("fs");
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const illustrateChatGroups = require("../../models/illustrateChatGroup");
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
async function speechToText(blobName) {
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
          "64ffef6ece40662d8a3069c7"
        );
        if (currentChatGroup) {
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
          const conversionInfo = [
            { role: roleMap.user, content: roleDescription },
            {
              role: roleMap.system,
              content: `For me, the major reason why I decided to going into a technology related field is that I love creating things. I used to write all the time while I was growing up, I love drawing, and I enjoy playing video games. Technology (specifically programming) always seemed like the natural next step to finding better ways to express myself. Luckily I had a family that was pretty supportive of letting me explore my interests, and helped provided the tools to do so. The fact that I get to spend my day creating things and solving puzzles is very rewarding to me, and makes me very glad that I chose this career path.

            My experience as being a "woman in tech" has been fairly positive, and one that I've found pretty rewarding. For women who find they enjoy technology and wish to pursue it professionally, my major suggestion is to make friends with people in the industry. That means both men and women that can help form the basis of support network. That way if you do run into the odd company that has that "Oh, you're a girl and you don't know about this tech stuff," vibe going on, you don't have to stay there (or alternatively, assume all places are like that and quit the tech industry). The nice thing about being someone with strong technical skills, is that your skills are in high enough demand that you can find work elsewhere, and with a strong network of friends, finding a healthy place to work is a lot easier. In general, most places actually are awesome to work at as a woman, and you don't have to stay at a place that doesn't treat you with respect.
            
            When it comes to leadership positions or in general progressing in your career, I have a few suggestions. First, always find ways to keep learning, even if it's just doing fun projects for yourself a few nights of the week. This is an industry that is constantly changing - making sure you keep your skills fresh will help you stay ahead. Second, I found that sometimes to get there, you have to take the initiative and maybe get outside of your comfort zone. For me, I started running local tech meetups for web development (since there weren't any in the area at the time), and practicing public speaking by talking at events on tech topics I was interested in. That helped people get to know me, and where my expertise was, and opened up leadership opportunities for me. If you allow yourself to be quiet in the background, no one will know who you are.
            
            Overall, I've enjoyed my time in technology, and if you're interested, I highly suggest you try it out.`,
            },
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
            userName: "Mark",
            reverse: true,
            bolbUrl: blobName,
            bolbName: blobName,
          };
          currentChatGroup.chatMessages.push(responseMessage);
          await textToSpeech(
            completion?.choices?.[0].message.content,
            blobName
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

module.exports = { speechToText };
