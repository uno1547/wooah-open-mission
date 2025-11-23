const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const { id, password } = req.body;
    if (!id || !password) {
      return res.status(400).json({ error: '아이디와 비밀번호를 모두 입력해주세요.' });
    }
    const result = await authService.registerUser({ id, password });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.login = async (req, res) => {
  try {
    const { id, password } = req.body;
    if (!id || !password) {
      return res.status(400).json({ error: '아이디와 비밀번호를 모두 입력해주세요.' });
    }
    const token = await authService.loginUser({ id, password });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}