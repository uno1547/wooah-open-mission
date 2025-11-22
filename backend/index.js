const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth');
// require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 기본 테스트 라우트
app.get('/', (req, res) => {
  res.send('🎧 Playlist AI Server Running...');
});

app.use('/api/auth', authRouter);



app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});