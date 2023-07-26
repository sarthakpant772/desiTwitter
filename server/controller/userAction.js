const UserSchema = require('../model/UserSchema')

const followUser = async (req, res) => {
  const userIdToFollow = req.body.userIdToFollow
  const { userId } = req.params

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
    const updatedUser = await UserSchema.findById(userId)

    res
      .status(200)
      .json({ message: 'User followed successfully.', data: updatedUser })
  } catch (error) {
    console.error('Error following user:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const unfollowUser = async (req, res) => {
  const userIdToUnfollow = req.body.userIdToUnfollow
  const { userId } = req.params

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
    const user = await UserSchema.findById(userId).populate(
      'followers',
      'username',
    )
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
    const user = await UserSchema.findById(userId).populate(
      'following',
      'username',
    )
    res.status(200).json({
      following: user.following,
      followingCount: user.followingCount(),
    })
  } catch (error) {
    console.error('Error getting user following:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = { getFollowers, getFollowing, followUser, unfollowUser }
