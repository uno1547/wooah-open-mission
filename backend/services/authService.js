const { db } = require('../firebase');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

exports.loginUser = async ({ id, password }) => {
  const userQuery = await db.collection('users').where('id', '==', id).get()
  if (userQuery.empty) throw new Error('존재하지 않는 아이디입니다.')
    
  const userData = userQuery.docs[0].data()

  const isMatch = await bcrypt.compare(password, userData.password)
  if (!isMatch) throw new Error('비밀번호가 일치하지 않습니다.')

  const token = jwt.sign(
    { id : userData.id }, 
    process.env.JWT_SECRET || 'secretKey', 
  )

    return token
}