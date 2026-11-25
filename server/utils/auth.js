const jwt = require('jsonwebtoken');
const SECRET = () => process.env.JWT_SECRET || 'dev_secret';
exports.sign = (user) => jwt.sign({ id: user._id }, SECRET(), { expiresIn: '7d' });
exports.requireAuth = (req, res, next) => {
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Please login first' });
  try { req.userId = jwt.verify(token, SECRET()).id; next(); }
  catch { res.status(401).json({ message: 'Session expired, login again' }); }
};
