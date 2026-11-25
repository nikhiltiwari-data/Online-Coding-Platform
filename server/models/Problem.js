const mongoose = require('mongoose');
module.exports = mongoose.model('Problem', new mongoose.Schema({
  title: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
  description: String,
  inputFormat: String,
  outputFormat: String,
  constraints: String,
  testCases: [{ input: String, output: String, hidden: { type: Boolean, default: false } }],
}, { timestamps: true }));
