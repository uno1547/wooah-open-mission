const openAIService = require('../services/openAIService');

exports.recommend = async (req, res) => {
  try {
    const { query } = req.body;
    if(!query) return res.status(400).json({ error: '쿼리 문장을 입력해주세요.' });
    
    const result = await openAIService.recommendPlaylists({ query });
    res.status(200).json(result);
    console.log(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}