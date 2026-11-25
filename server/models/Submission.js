const mongoose = require('mongoose');
module.exports = mongoose.model('Submission', new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  language: String,
  code: String,
  verdict: String,
  passed: Number,
  total: Number,
  error: String,
  results: [{ status: String, timeMs: Number }],
}, { timestamps: true }));
