const mongoose = require('mongoose')

// Create a Mongoose schema for a Twitter post
const twitterCommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  author: {
    type: String,
    required: true,
  },
})

// Create the Twitter Post model
const TwitterPost = mongoose.model('DesiTwitterComment', twitterCommentSchema)

// Export the model to be used in other parts of the application
module.exports = TwitterPost
