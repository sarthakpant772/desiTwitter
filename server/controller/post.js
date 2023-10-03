const PostSchema = require('../model/PostSchema')
const UserSchema = require('../model/UserSchema')
const User = require('../model/UserSchema')
const CommentSchema = require('../model/CommentSchema')

const createPost = async (req, res) => {
  const { content } = req.body

  try {
    const newPost = new PostSchema({
      content,
      author: req.user.id,
    })

    const post = await newPost.save()

    res.status(201).json({ message: 'Post created successfully.', post: post })
  } catch (error) {
    console.error('Error creating post:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getAllPostByUserID = async (req, res) => {
  try {
    const data = await PostSchema.find({ author: req.user.id }).sort({ createdAt: -1 })
    res.status(201).json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}
// Like a post
const likePost = async (req, res) => {
  // console.log('id', req.user.id)
  const { postId } = req.params
  const userId = req.user.id
  console.log(userId)

  try {
    const user = await UserSchema.findById(userId)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const post = await PostSchema.find({ _id: postId })

    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    const isPostLiked = await user.likedTweet.includes(postId)
    if (isPostLiked) {
      // Post is already liked, remove it from likedTweet
      await UserSchema.findByIdAndUpdate(userId, {
        $pull: { likedTweet: postId },
      })
      await PostSchema.findByIdAndUpdate(postId, { $inc: { likes: -1 } })
    } else {
      // Post is not liked, add it to likedTweet
      await UserSchema.findByIdAndUpdate(userId, {
        $push: { likedTweet: postId },
      })
      await PostSchema.findByIdAndUpdate(postId, { $inc: { likes: 1 } })
    }

    res.status(200).json({ message: 'Post liked/unliked successfully.' })
  } catch (error) {
    console.error('Error liking/unliking post:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Retweet a post
const retweetPost = async (req, res) => {
  const { postId } = req.body
  const userId = req.user.id

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
  const { commentText } = req.body
  const userId = req.user.id

  try {
    const newComment = new CommentSchema({
      content: commentText,
      author: userId,
      postId,
    })
    const data = await newComment.save()
    res.status(200).json(data)
  } catch (error) {
    console.error('Error adding comment:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getCommentByPostId = async (req, res) => {
  const { postId } = req.params

  try {
    const allComments = await CommentSchema.find({ postId: postId })
    res.status(200).json(allComments)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const getPostById = async (req, res) => {
  const { postId } = req.params
  console.log(postId)
  try {
    const data = await PostSchema.findById(postId)

    res.status(200).json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const getAllPost = async (req, res) => {
  try {
    const data = await PostSchema.find().sort({ createdAt: -1 })
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
  getAllPostByUserID,
  getCommentByPostId,
}
