const userService = require('../services/userService');

exports.addUserList = async (req, res) => {
  try {
    // const { userId } = req.user;
    // const userId = req.user.id;
    const { id } = req.user
    const playlist = req.body;

    const result = await userService.addUserPlaylist({ id, playlist });
    res.status(201).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.getUserList = async (req, res) => {
  try {
    const { id } = req.user;
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}