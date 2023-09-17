const coachData = require("../../models/coachData");
const { getEmbeddings } = require("../../utils/embedding");
const path = require("path");
const xlxs = require("node-xlsx");
const coachDataUpload = (req, res) => {
  let sampleFile;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.file;
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

module.exports = { coachDataUpload };
