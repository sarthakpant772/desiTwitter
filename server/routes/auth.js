const express = require('express')
const {
  registerUser,
  loginUser,
  getUserById,
  getAllUser,
  getUser,
} = require('../controller/auth')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/signup', registerUser)
router.post('/login', loginUser)
router.get('/user/:id', getUserById)
router.get('/getAll', auth, getAllUser)
router.get('/getUser', auth,getUser)
module.exports = router
