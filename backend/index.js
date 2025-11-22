const express = require('express');
const cors = require('cors');
const { db } = require('./firebase');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 기본 테스트 라우트
app.get('/', (req, res) => {
  res.send('🎧 Playlist AI Server Running...');
});

// firestore 연결 테스트 라우트
app.get('/firestore-test', async (req, res) => {
  const snapshot = await db.collection('test').get();
  res.send(snapshot.size > 0 ? 'Firestore 연결 성공!' : 'Firestore 연결 실패!');
});



app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});