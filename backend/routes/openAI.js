const express = require('express');
const router = express.Router();
const openAIController = require('../controllers/openAIController');

router.post('/recommend', openAIController.recommend);

module.exports = router;