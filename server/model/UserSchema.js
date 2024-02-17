const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    require: true,
    min: 6,
    max: 255,
  },
  lname: {
    type: String,
    require: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    require: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    require: true,
    min: 6,
    max: 255,
  },
  userName: {
    type: String,
    require: true,
    unique: true,
    min: 6,
    max: 255,
  },
  userPost: { type: mongoose.Types.ObjectId, ref: "DesiTwitterPost" },
  profileThumbNail: {
    type: String,
    default:
      "https://imgs.search.brave.com/JSHSka1craSsoVqeAbvS3wAq2JMhtpBFRZdiMLcU448/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wZnBt/YWtlci5jb20vX251/eHQvaW1nL3Jlc3Vs/dC1waWMtNS45ODg5/ZDNjLnBuZw",
  },
  profileImage: {
    type: String,
    default:
      "https://imgs.search.brave.com/JSHSka1craSsoVqeAbvS3wAq2JMhtpBFRZdiMLcU448/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wZnBt/YWtlci5jb20vX251/eHQvaW1nL3Jlc3Vs/dC1waWMtNS45ODg5/ZDNjLnBuZw",
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  retweets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DesiTwitterPost",
    },
  ],
  likedTweet: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DesiTwitterPost",
    },
  ],
  bookmark: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DesiTwitterPost",
    },
  ],
});

// userSchema.methods.followersCount = function () {
//   return this.followers.length
// }

// // Method to get the count of following
// userSchema.methods.followingCount = function () {
//   return this.following.length
// }

module.exports = mongoose.model("users", userSchema);
