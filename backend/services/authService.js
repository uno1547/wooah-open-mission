const { db } = require('../firebase');
const bcrypt = require('bcrypt');

exports.registerUser = async ({ id, password}) => {
  const userQuery = await db.collection('users').where('id', '==', id).get()
  if (!userQuery.empty) throw new Error('이미 존재하는 아이디입니다.')
  
  const hashedPassword = await bcrypt.hash(password, 10)
  await db.collection('users').add({ 
    id, 
    password: hashedPassword,
    createdAt: new Date()
  })

  return { message: '회원가입이 완료되었습니다.'}
}