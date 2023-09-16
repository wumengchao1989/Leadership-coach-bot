const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
const azureApiKey = process.env["AZURE_OPENAI_KEY"];
const azure_chatapi = new OpenAIClient(
  endpoint,
  new AzureKeyCredential(azureApiKey)
);
const azure_chat_deployment_name = "chatdemo";
const azure_embedding_deployment_name = "textembedding";
module.exports = {
  azure_embedding_deployment_name,
  azure_chat_deployment_name,
  azure_chatapi,
};
