const express = require("express");
const {
  createPost,
  likePost,
  retweetPost,
  commentOnPost,
  getPostById,
  getAllPost,
  getAllPostByUserID,
  getCommentByPostId,
} = require("../controller/post");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/createPost", auth, createPost);
router.post("/likePost/:postId", auth, likePost);
router.post("/retweet", auth, retweetPost);
router.post("/comment/:postId", auth, commentOnPost);
router.get("/postById/:postId", getPostById);
router.get("/allPost/:pageNo/:pageSize", getAllPost);
router.get("/allPostByUserId", auth, getAllPostByUserID);
router.get("/allComment/:postId", getCommentByPostId);
module.exports = router;
