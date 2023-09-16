require("dotenv").config();
const path = require("path");
const fs = require("fs");
const {
  azure_embedding_deployment_name,
  azure_chatapi,
} = require("../chatgpt/index");
const componentEmbeddings = require("../models/componentEmbeddings.js");
const componentPropsEmbeddings = require("../models/componentPropsEmbeddings.js");
const training_sets_path = path.resolve("./training_sets/react-antd");
async function generateEmbeddings(req, res) {
  const completion = await getEmbeddings(req.body.message);
  res.json({
    success: true,
    res: completion,
  });
}
/**
 * generate embeddings from openAI's api.
 * completion{
 *  data:[{embedding:String,index:number,}],
 *  usage:{promptTokens,totalTokens}
 * }
 * */
async function getEmbeddings(message) {
  const completion = await azure_chatapi.getEmbeddings(
    azure_embedding_deployment_name,
    [message]
  );
  return completion;
}

async function generateComponentEmbeddings(req, res) {
  const { componentName } = req.body;
  const componentInfoPath = path.join(
    training_sets_path,
    componentName,
    "propsList.json"
  );
  const componentInfo = JSON.parse(
    fs.readFileSync(componentInfoPath).toString()
  );
  const propList = componentInfo[componentName].subComponentsList[0].propList;
  let newComponentEmbeddings = {};
  newComponentEmbeddings.componentName = componentName;
  newComponentEmbeddings.description = componentInfo[componentName].description;
  let combinedDoc = `Instructions: ${componentName} is ${componentInfo[componentName].description}, and it has props like:`;
  for (let i = 0; i < propList.length && i < 5; i++) {
    combinedDoc += ` ${propList[i].Name}, which is ${propList[i].Type} and is used for ${propList[i].Description}`;
  }
  newComponentEmbeddings.combinedDoc = combinedDoc;
  const embeddingResult = await getEmbeddings(combinedDoc);
  newComponentEmbeddings.embedding = embeddingResult.data[0].embedding;
  componentEmbeddings.findOneAndReplace(
    { componentName },
    newComponentEmbeddings
  );
  res.json({
    success: true,
    res: newComponentEmbeddings,
  });
}

const generateComponentPropsEmbeddings = async (req, res) => {
  const { componentName } = req.body;
  const componentInfoPath = path.join(
    training_sets_path,
    componentName,
    "propsList.json"
  );
  const componentInfo = JSON.parse(
    fs.readFileSync(componentInfoPath).toString()
  );
  const propList = componentInfo[componentName].subComponentsList[0].propList;
  for await (let prop of propList) {
    let nexComponentPropsEmbeddings = new componentPropsEmbeddings();
    nexComponentPropsEmbeddings.propsName = prop.Name;
    nexComponentPropsEmbeddings.description = prop.Description;
    nexComponentPropsEmbeddings.type = prop.Type;
    nexComponentPropsEmbeddings.version = prop.Version;
    nexComponentPropsEmbeddings.default = prop.Default;
    nexComponentPropsEmbeddings.componentId = "12";
    const combinedDoc =
      `Instructions: ${prop.Name} in ${componentName} is used for ${prop.Description}, and its type is ${prop.Type}, ` +
      (prop.Default === "-"
        ? " and it has no default value"
        : `and its default value is ${prop.Default}`);
    nexComponentPropsEmbeddings.combinedDoc = combinedDoc;
    const embeddingResult = await getEmbeddings(combinedDoc);
    nexComponentPropsEmbeddings.embedding = embeddingResult.data[0].embedding;
    await nexComponentPropsEmbeddings.save();
  }
  res.json({
    success: true,
  });
};

const getComponentPropPreInfo = async (prompt) => {
  const promptEmbeddingResult = await classfiedBot.requestEmbeddings(prompt);
  const promptEmbedding = promptEmbeddingResult.data[0].embedding;
  const docs = await componentPropsEmbeddings.find();
  let maxSimilarity = -10000;
  let maxSimilarityCombinedDoc = "";
  let maxSimilarityCombinedDocId = "";
  for (let item of docs) {
    const curEmbedding = item.embedding;
    const curSimilarity = similarity(curEmbedding, promptEmbedding);
    if (maxSimilarity < curSimilarity) {
      maxSimilarityCombinedDoc = item.combinedDoc;
      maxSimilarity = curSimilarity;
      maxSimilarityCombinedDocId = item._id;
    }
  }
  return { maxSimilarityCombinedDoc, maxSimilarityCombinedDocId };
};

module.exports = {
  generateEmbeddings,
  generateComponentEmbeddings,
  generateComponentPropsEmbeddings,
};
