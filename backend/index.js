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
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 기본 테스트 라우트
app.get('/', (req, res) => {
  res.send('🎧 Playlist AI Server Running...');
});

app.use('/api/auth', authRouter);

app.use('/api/openAI', openAIRouter);

app.use('/api/user', userRouter)

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});