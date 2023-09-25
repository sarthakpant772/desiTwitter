const express = require('express')
const multer = require('multer')
const path = require('path')
const { uploadProfilePic } = require('../controller/upload')
const auth = require('../middleware/auth')

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'public/Images')
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname),
    )
  },
})

const upload = multer({
  storage: storage,
})

const router = express.Router()

router.post('/profilePic', auth, upload.single('file'), uploadProfilePic)

module.exports = router
