const express = require('express')
const {
  registerUser,
  loginUser,
  getUserById,
  getAllUser,
  getUser,
  getLikedPostByUserName,
  getRetweetByUserName,
  getUserByUserName,
  getallPostByUserId,
  getUserLoggedInStatus,
} = require('../controller/auth')
const auth = require('../middleware/auth')


const router = express.Router()

router.post('/signup', registerUser)
router.post('/login', loginUser)
router.get('/user/:id', getUserById)
router.get('/getAll', auth, getAllUser)
router.get('/getUser', auth, getUser)
router.get('/checkUserLoggedIn' , auth , getUserLoggedInStatus)
router.get('/getUserByName/:userName', getUserByUserName)
router.get('/getAllPostByUserId/:userId', getallPostByUserId)
router.get('/likedtweet/:userName', getLikedPostByUserName)
router.get('retweet/:userName', getRetweetByUserName)
module.exports = router
