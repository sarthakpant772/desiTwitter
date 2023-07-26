const express = require('express')
const {
  followUser,
  unfollowUser,
  getFollowing,
  getFollowers,
} = require('../controller/userAction')

const router = express.Router()

router.post('/follow/:userId', followUser)
router.post('/unfollow/:userId', unfollowUser)
router.get('/getfollowing', getFollowing)
router.get('/getfollower', getFollowers)

module.exports = router
