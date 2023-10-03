const UserSchema = require('../model/UserSchema')
const PostSchema = require('../model/PostSchema')

const followUser = async (req, res) => {
  const { userIdToFollow } = req.params
  const userId = req.user.id
  try {
    // Update the user's following array
    await UserSchema.findByIdAndUpdate(userId, {
      $push: { following: userIdToFollow },
    })

    // Update the user to be followed's followers array
    await UserSchema.findByIdAndUpdate(userIdToFollow, {
      $push: { followers: userId },
    })

    // Fetch the updated user data
    // const updatedUser = await UserSchema.findById(userId)

    res.status(200).json({ message: 'User followed successfully.' })
  } catch (error) {
    console.error('Error following user:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const unfollowUser = async (req, res) => {
  const userId = req.user.id
  const { userIdToUnfollow } = req.params

  try {
    // Update the user's following array
    await UserSchema.findByIdAndUpdate(userId, {
      $pull: { following: userIdToUnfollow },
    })
    // Update the user to be unfollowed's followers array
    await UserSchema.findByIdAndUpdate(userIdToUnfollow, {
      $pull: { followers: userId },
    })

    res.status(200).json({ message: 'User unfollowed successfully.' })
  } catch (error) {
    console.error('Error unfollowing user:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getFollowers = async (req, res) => {
  const { userId } = req.params

  try {
    const user = await UserSchema.findById(userId)
      .populate('followers', 'username')
      .sort({ createdAt: -1 })
    res.status(200).json({
      followers: user.followers,
      followersCount: user.followersCount(),
    })
  } catch (error) {
    console.error('Error getting user followers:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getFollowing = async (req, res) => {
  const { userId } = req.params

  try {
    const user = await UserSchema.findById(userId)
      .populate('following', 'username')
      .sort({ createdAt: -1 })
    res.status(200).handleFollowjson({
      following: user.following,
      followingCount: user.followingCount(),
    })
  } catch (error) {
    console.error('Error getting user following:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
const getLikedPost = async (req, res) => {
  const id = req.user.id

  try {
    const user = await UserSchema.findById(id)
      .populate('likedTweet')
      .sort({ createdAt: -1 })
    res.status(200).json(user.likedTweet)
  } catch (err) {
    res.status(500).json(err)
  }
}

const bookmarkPost = async (req, res) => {
  // console.log('id', req.user.id)
  const postId = req.body.postId
  const userId = req.user.id

  try {
    const user = await UserSchema.findById(userId)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const post = await PostSchema.find({ _id: postId })

    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    const isPostBookmarked = await user.bookmark.includes(postId)
    if (isPostBookmarked) {
      // Post is already liked, remove it from likedTweet
      await UserSchema.findByIdAndUpdate(userId, {
        $pull: { bookmark: postId },
      })
    } else {
      // Post is not liked, add it to likedTweet
      await UserSchema.findByIdAndUpdate(userId, {
        $push: { bookmark: postId },
      })
    }

    res
      .status(200)
      .json({ message: 'Post bookmarked/unbookmarked successfully.' })
  } catch (error) {
    console.error('Error bookmarking/unbookmarking post:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const resharePost = async (req, res) => {
  // console.log('id', req.user.id)
  const postId = req.body.postId
  const userId = req.user.id

  try {
    const user = await UserSchema.findById(userId)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const post = await PostSchema.find({ _id: postId })

    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    const isPostBookmarked = await user.retweets.includes(postId)
    if (isPostBookmarked) {
      // Post is already liked, remove it from likedTweet
      await UserSchema.findByIdAndUpdate(userId, {
        $pull: { retweets: postId },
      })
    } else {
      // Post is not liked, add it to likedTweet
      await UserSchema.findByIdAndUpdate(userId, {
        $push: { retweets: postId },
      })
    }

    res
      .status(200)
      .json({ message: 'Post bookmarked/unbookmarked successfully.' })
  } catch (error) {
    console.error('Error bookmarking/unbookmarking post:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getResharePost = async (req, res) => {
  const id = req.user.id

  try {
    const user = await UserSchema.findById(id)
      .populate('retweets')
      .sort({ createdAt: -1 })
    res.status(200).json(user.bookmark)
  } catch (err) {
    res.status(500).json(err)
  }
}

const getBookmarkedPosts = async (req, res) => {
  const id = req.user.id

  try {
    const user = await UserSchema.findById(id)
      .populate('bookmark')
      .sort({ createdAt: -1 })
    res.status(200).json(user.bookmark)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = {
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
  getLikedPost,
  bookmarkPost,
  getBookmarkedPosts,
  resharePost,
  getResharePost,
}
