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

exports.getUserPlaylists = async ({ id }) => {
  const snapshot = await db
    .collection('users')
    .doc(id)
    .collection('playlists')
    .orderBy('createdAt', 'desc')
    .get();

  return snapshot.docs.map(doc => ({
    id : doc.id,
    ...doc.data()
  }))
}