const { db } = require('../firebase');
exports.addUserPlaylist = async ({ id, playlist }) => {
  const dataToSave = {
    ...playlist,
    createdAt: new Date()
  }

  return await db
    .collection('users')
    .doc(id)
    .collection('playlists')
    .add(dataToSave);
}