const router = require('express').Router();
const Problem = require('../models/Problem');

router.get('/', async (req, res) => {
  const list = await Problem.find().select('title difficulty').sort({ createdAt: 1 });
  res.json(list);
});

router.get('/:id', async (req, res) => {
  try {
    const p = await Problem.findById(req.params.id).lean();
    if (!p) return res.status(404).json({ message: 'Problem not found' });
    p.testCases = p.testCases.filter((t) => !t.hidden).map((t) => ({ input: t.input, output: t.output }));
    res.json(p);
  } catch { res.status(404).json({ message: 'Problem not found' }); }
});

module.exports = router;
