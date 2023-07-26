const User = require('../model/UserSchema')
const argon2 = require('argon2')
const UserSchema = require('../model/UserSchema')

const registerUser = async (req, res) => {
  password = req.body.password
  password = await argon2.hash(password)
  const newUser = new User({
    email: req.body.email,
    password: password,
    fname: req.body.fname,
    lname: req.body.lname,
    userName: req.body.userName,
  })
  try {
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const loginUser = async (req, res) => {
  const body = req.body
  const userName = body?.userName
  const password = body?.password
  try {
    const checkUser = await User.findOne({ userName: userName })
    const password_hash = checkUser?.password
    if (await argon2.verify(password_hash, password)) {
      res.status(200).json(checkUser)
    } else {
      res.status(403).json({ text: 'password not correct' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const data = await UserSchema.findById(id)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}, 'username email followers following')
      .populate('followers', 'username')
      .populate('following', 'username')

    res.status(200).json(users)
  } catch (error) {
    console.error('Error getting all users:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = { registerUser, loginUser, getUserById, getAllUser }
