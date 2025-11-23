const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: '로그인이 필요합니다.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
    req.user = decoded; // 사용자 정보 저장 (id 등)
    next();
  } catch (err) {
    return res.status(403).json({ error: '토큰이 유효하지 않습니다.' });
  }
};
