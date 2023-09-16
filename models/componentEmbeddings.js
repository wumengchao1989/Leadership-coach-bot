const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const componentEmbeddingsSchema = new Schema({
  componentName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  combinedDoc: {
    type: String,
    required: true,
  },
  embedding: {
    type: [Number],
    required: false,
  },
});

module.exports = mongoose.model(
  "componentEmbeddings",
  componentEmbeddingsSchema
);
