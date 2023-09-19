const coachData = require("../../models/coachData");
const { getEmbeddings } = require("../../utils/embedding");
const path = require("path");
const xlxs = require("node-xlsx");
const fs = require("fs");
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const speechConfig = sdk.SpeechConfig.fromSubscription(
  "ac5b31c0448a4b26a2223616040fade3",
  "eastus"
);
speechConfig.speechRecognitionLanguage = "en-US";
const coachDataUpload = (req, res) => {
  let sampleFile;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.file;
  const coachDataPath = path.resolve("./public/coachData");
  if (!fs.existsSync(coachDataPath)) {
    fs.mkdirSync(coachDataPath);
  }
  const coachDataFilePath = path.resolve(
    `./public/coachData/${sampleFile.name}`
  );
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(coachDataFilePath, async function (err) {
    if (err) return res.status(500).send(err);
    const workSheetsFromFile = xlxs.parse(coachDataFilePath);
    for (let item of workSheetsFromFile) {
      if (item.name === "CoachData") {
        const data = item.data || [];
        for await (const item of data) {
          const metaData = item;
          const instructorName = metaData[2];
          const primaryCate = metaData[3];
          const content = metaData[4];
          const embedding = await getEmbeddings(content);
          const tempData = {
            instructorName,
            primaryTitle: primaryCate,
            coachData: content,
            embedding: embedding.data[0].embedding,
            createAt: new Date(),
          };
          const tempCoachData = new coachData(tempData);
          await tempCoachData.save();
        }
      }
    }
    res.send("File uploaded!");
  });
};

async function speechToText(audioPath) {
  const audioFile = fs.readFileSync(audioPath);
  let audioConfig = sdk.AudioConfig.fromWavFileInput(audioFile);
  let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
  return new Promise((resolve, reject) => {
    speechRecognizer.recognizeOnceAsync(
      async (result) => {
        if (result.privText) {
          const filePath = path.resolve(
            `./public/coachTextData/jeff_text_003.txt`
          );
          const currentContent = fs.readFileSync(filePath).toString();
          fs.writeFileSync(filePath, currentContent + " " + result.privText);
        }
        speechRecognizer.close();
        resolve();
      },
      (err) => {
        console.log(err);
        reject();
      }
    );
  });
}

const voiceAudioUpload = async (req, res) => {
  const dirPath = path.resolve("./public/coachVoiceData/jeff003");
  const fileList = fs.readdirSync(dirPath);
  for await (let file of fileList) {
    var pathname = path.join(dirPath, file);
    await speechToText(pathname);
  }
};

module.exports = { coachDataUpload, voiceAudioUpload };
