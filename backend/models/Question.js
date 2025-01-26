const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  solution: { type: String, required: true, default: "Solution not provided" },
  type: { type: String, required: true },  // Added 'type' field
  anagramType: { type: String },  // Optional field for anagram types (e.g., WORD, SENTENCE)
  blocks: [{ 
    text: { type: String, required: true },  // Each block contains text
    showInOption: { type: Boolean, default: true },  // Whether the block should show in options
    isAnswer: { type: Boolean, default: false }  // Whether the block is the answer
  }],
  siblingId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },  // Reference to another Question if related
  options: [{ 
    text: { type: String, required: true },
    isCorrectAnswer: { type: Boolean, required: true }
  }]
});

// Create a text index on the 'title' field
QuestionSchema.index({ title: "text" });

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
