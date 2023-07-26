const express = require('express')
const {
  registerUser,
  loginUser,
  getUserById,
  getAllUser,
} = require('../controller/auth')

const router = express.Router()

router.post('/signup', registerUser)
router.post('/login', loginUser)
router.get('/user/:id', getUserById)
router.get('/getAll', getAllUser)
module.exports = router
