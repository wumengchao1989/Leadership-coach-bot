const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const componentPropsSchema = new Schema({
  propsName: {
    type: String,
    required: true,
  },
  componentId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  combinedDoc: {
    type: String,
    required: true,
  },
  embedding: {
    type: [Number],
    required: true,
  },
});

module.exports = mongoose.model("componentProps", componentPropsSchema);
