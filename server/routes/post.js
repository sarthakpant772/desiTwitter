const express = require('express')
const {
  createPost,
  likePost,
  retweetPost,
  commentOnPost,
  getPostById,
  getAllPost,
  getAllPostByUserID,
} = require('../controller/post')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/createPost', auth, createPost)
router.post('/likePost/:postId', auth, likePost)
router.post('/retweet', auth, retweetPost)
router.post('/comment/:postId', commentOnPost)
router.get('/postById/:postId', getPostById)
router.get('/allPost', getAllPost)
router.get('/allPostByUserId', auth, getAllPostByUserID)

module.exports = router
