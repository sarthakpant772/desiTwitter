const express = require('express')
const {
  followUser,
  unfollowUser,
  getFollowing,
  getFollowers,
  getLikedPost,
  bookmarkPost,
  getBookmarkedPosts,
  resharePost,
} = require('../controller/userAction')
const auth = require('../middleware/auth')

const router = express.Router()

router.put('/follow/:userIdToFollow', auth, followUser)
router.put('/unfollow/:userIdToUnfollow', auth, unfollowUser)
router.get('/getfollowing', getFollowing)
router.get('/getfollower', getFollowers)
router.get('/getLikedPost', auth, getLikedPost)
router.post('/bookmarkPost', auth, bookmarkPost)
router.get('/getBookmarkPost', auth, getBookmarkedPosts)
router.post('/reshare', auth, resharePost)
router.get('/getReshare', auth, resharePost)
module.exports = router
