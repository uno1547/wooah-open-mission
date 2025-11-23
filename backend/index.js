require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const authRouter = require('./routes/auth');
const openAIRouter = require('./routes/openAI');
const userRouter = require('./routes/user');

app.use(cors());
app.use(express.json());

// API 라우트를 먼저 정의
app.use('/api/auth', authRouter);
app.use('/api/openAI', openAIRouter);
app.use('/api/user', userRouter);

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// SPA를 위한 catch-all 라우트 (맨 마지막에)
app.get('*', (req, res) => {
  // API 요청은 제외
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});