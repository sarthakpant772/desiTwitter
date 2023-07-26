const PostSchema = require('../model/PostSchema')
const UserSchema = require('../model/UserSchema')

const createPost = async (req, res) => {
  const { content, author } = req.body

  try {
    const newPost = new PostSchema({
      content,
      author,
    })

    await newPost.save()

    res
      .status(201)
      .json({ message: 'Post created successfully.', post: newPost })
  } catch (error) {
    console.error('Error creating post:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Like a post
const likePost = async (req, res) => {
  const { postId } = req.params
  const { userId } = req.body

  try {
    await PostSchema.findByIdAndUpdate(postId, { $inc: { likes: 1 } })

    res.status(200).json({ message: 'Post liked successfully.' })
  } catch (error) {
    console.error('Error liking post:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Retweet a post
const retweetPost = async (req, res) => {
  const { postId } = req.params
  const { userId } = req.body

  try {
    // Check if the user has already retweeted the post to avoid duplication
    const post = await PostSchema.findById(postId)
    const user = await UserSchema.findById(userId)
    if (user.retweets.includes(userId)) {
      return res
        .status(400)
        .json({ message: 'User already retweeted this post.' })
    }

    await UserSchema.findByIdAndUpdate(UserSchema, {
      $push: { retweets: postId },
    })

    res.status(200).json({ message: 'Post retweeted successfully.' })
  } catch (error) {
    console.error('Error retweeting post:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Comment on a post
const commentOnPost = async (req, res) => {
  const { postId } = req.params
  const { userId, commentText } = req.body

  try {
    await PostSchema.findByIdAndUpdate(postId, {
      $push: { comments: { text: commentText, author: userId } },
    })

    res.status(200).json({ message: 'Comment added successfully.' })
  } catch (error) {
    console.error('Error adding comment:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getPostById = async (req, res) => {
  const { postId } = req.params
  try {
    const data = await PostSchema.findById(postId)
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
}

const getAllPost = async (req, res) => {
  try {
    const data = await PostSchema.find()
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
}
module.exports = {
  createPost,
  likePost,
  commentOnPost,
  retweetPost,
  getAllPost,
  getPostById,
}
