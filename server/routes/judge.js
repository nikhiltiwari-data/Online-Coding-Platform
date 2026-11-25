const router = require('express').Router();
const Problem = require('../models/Problem');
const Submission = require('../models/Submission');
const { requireAuth } = require('../utils/auth');
const { runCode, judge, LANGS } = require('../utils/runner');

const MAX_CODE = 50000;
const check = (language, code) => {
  if (!LANGS[language]) return 'Unsupported language';
  if (!code || !code.trim()) return 'Code is empty';
  if (code.length > MAX_CODE) return 'Code is too long';
  return null;
};

// Run with custom input (playground)
router.post('/run', async (req, res) => {
  const { language, code, input } = req.body;
  const err = check(language, code);
  if (err) return res.status(400).json({ message: err });
  try { res.json(await runCode(language, code, input || '')); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

// Submit against all test cases
router.post('/submit', requireAuth, async (req, res) => {
  const { problemId, language, code } = req.body;
  const err = check(language, code);
  if (err) return res.status(400).json({ message: err });
  try {
    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });
    const r = await judge(language, code, problem.testCases);
    const sub = await Submission.create({ user: req.userId, problem: problem._id, language, code, ...r });
    res.json({ id: sub._id, ...r });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/submissions/me', requireAuth, async (req, res) => {
  const filter = { user: req.userId };
  if (req.query.problemId) filter.problem = req.query.problemId;
  const subs = await Submission.find(filter).sort({ createdAt: -1 }).limit(100).populate('problem', 'title');
  res.json(subs);
});

module.exports = router;
