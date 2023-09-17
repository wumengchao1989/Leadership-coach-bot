const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const coachDataGroupSchema = new Schema({
  instructorName: {
    type: String,
    required: true,
  },
  primaryTitle: {
    type: String,
    retuired: true,
  },
  coachData: {
    type: String,
    required: true,
  },
  embedding: {
    type: [Number],
    required: false,
  },
  createAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("coachData", coachDataGroupSchema);
