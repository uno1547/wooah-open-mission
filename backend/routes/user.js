const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleWare');
const userController = require('../controllers/userController');

router.post('/list', authMiddleware, userController.addUserList);
router.get('/list', authMiddleware, userController.getUserList);

module.exports = router;