const User = require('../model/UserSchema')
const argon2 = require('argon2')
const UserSchema = require('../model/UserSchema')
const jwt = require('jsonwebtoken')
const PostSchema = require('../model/PostSchema')

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
    const payload = {
      user: {
        id: savedUser._id,
      },
    }
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7 days' },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      },
    )
    res.status(201).json(savedUser)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const loginUser = async (req, res) => {
  const body = req.body
  const userName = body?.username
  const password = body?.password
  try {
    const checkUser = await User.findOne({ userName: userName })
    const password_hash = checkUser?.password
    if (await argon2.verify(password_hash, password)) {
      const payload = {
        user: {
          id: checkUser._id,
        },
      }

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '30 days' },
        (err, token) => {
          if (err) throw err
          res
            .cookie('access_token', token, {
              httpOnly: true,
            })
            .json({ token })
        },
      )

      // res.status(200).json(checkUser)
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

const getUser = async (req, res) => {
  try {
    const data = await User.findById(req.user.id)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'User not found' })
  }
}

const logout = async (req, res) => {
  return res
    .clearCookie('access_token')
    .status(200)
    .json({ messgae: 'done removed' })
}

const getUserByUserName = async (req, res) => {
  const { userName } = req.params
  try {
    const data = await UserSchema.findOne({
      userName,
    })
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
}

const getLikedPostByUserName = async (req, res) => {
  const { userName } = req.params
  try {
    const data = await UserSchema.find({
      userName,
    }).populate('likedTweet')
    res.status(200).json(data.likedTweet)
  } catch (err) {
    res.status(500).json(err)
  }
}

const getallPostByUserId = async (req, res) => {
  const { userId } = req.params
  try {
    const data = await PostSchema.find({ author: userId }).sort({
      createdAt: -1,
    })
    res.status(201).json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const getRetweetByUserName = async (req, res) => {
  const { userName } = req.params
  try {
    const data = await UserSchema.find({
      userName,
    }).populate('retweets')
    res.status(200).json(data.retweets)
  } catch (err) {
    res.status(500).json(err)
  }
}
const getUserLoggedInStatus = async(req, res)=>{
  res.status(200).json({
    msg:'log in success'
  })
}
module.exports = {
  getUserLoggedInStatus,
  registerUser,
  loginUser,
  getUserById,
  getAllUser,
  logout,
  getUser,
  getUserByUserName,
  getLikedPostByUserName,
  getRetweetByUserName,
  getallPostByUserId,
}
