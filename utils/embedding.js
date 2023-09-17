require("dotenv").config();
const path = require("path");
const {
  azure_embedding_deployment_name,
  azure_chatapi,
} = require("../chatgpt/index");
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

module.exports = {
  generateEmbeddings,
  getEmbeddings,
};
