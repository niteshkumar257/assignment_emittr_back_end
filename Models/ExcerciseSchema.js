const mongoose = require("mongoose");

const ExcerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  difficultLevel: {
    type: String,
    required: true,
  },
  language: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lang",
    required: true,
  },
  questions: [
    {
      questionText: {
        type: String,
        required: true,
      },
      options: [
        {
          type: String,
          required: true,
        },
      ],
      correctOption: {
        type: Number,
        required: true,
      },
      mark: {
        type: Number,
        required: true,
      },
    },
  ],
});
module.exports = mongoose.model("Excercise", ExcerciseSchema);
