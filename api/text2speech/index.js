const sdk = require("microsoft-cognitiveservices-speech-sdk");
const path = require("path");
const fs = require("fs");

// Create the speech synthesizer.
async function textToSpeech(text, audioFileName, instructorName) {
  const audioDownloadedPath = path.resolve("./public/audio");
  if (!fs.existsSync(audioDownloadedPath)) {
    fs.mkdirSync(audioDownloadedPath);
  }
  const audioFile = path.resolve(`./public/audio/${audioFileName}`);
  // This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
  const speechConfig = sdk.SpeechConfig.fromSubscription(
    process.env.SPEECH_KEY,
    process.env.SPEECH_REGION
  );
  const voiceName =
    instructorName === "Jeff"
      ? "en-US-DavisNeural"
      : instructorName === "Shawni"
      ? "en-US-ElizabethNeural"
      : "en-US-GuyNeural";
  speechConfig.speechSynthesisVoiceName = voiceName;
  const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFile);
  var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
  const speechToText = () =>
    new Promise((resolve, reject) => {
      synthesizer.speakTextAsync(
        text,
        function (result) {
          if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
            resolve(true);
          } else {
            console.error(
              "Speech synthesis canceled, " +
                result.errorDetails +
                "\nDid you set the speech resource key and region values?"
            );
          }
          synthesizer.close();
          synthesizer = null;
        },
        function (err) {
          console.trace("err - " + err);
          synthesizer.close();
          synthesizer = null;
        }
      );
    });
  return await speechToText();
  // The language of the voice that speaks.
}

module.exports = { textToSpeech };
