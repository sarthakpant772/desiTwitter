const express = require('express')
const {
  createPost,
  likePost,
  retweetPost,
  commentOnPost,
  getPostById,
  getAllPost,
} = require('../controller/post')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/createPost', auth, createPost)
router.post('/likePost/:postId', likePost)
router.post('/retweet/:postId', retweetPost)
router.post('/comment/:postId', commentOnPost)
router.get('/postById/:postId', getPostById)
router.get('/allPost', getAllPost)

module.exports = router
