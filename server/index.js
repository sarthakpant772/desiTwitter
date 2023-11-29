require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const multer = require('multer')

const auth = require('./middleware/auth')
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.json({ limit: '64mb' }))
app.use(cors())
app.use(express.static('public'))
// middleware use
// app.use(bodyParser.json())
// routes

app.get('/', (req, res) => {
  res.json({ message: 'API Working' })
})

const uploadRoute = require('./routes/upload')
app.use('/upload', uploadRoute)

const authRoute = require('./routes/auth')
app.use('/user', authRoute)

const userAction = require('./routes/userAction')
app.use('/action', userAction)

const post = require('./routes/post')
const UserSchema = require('./model/UserSchema')
app.use('/post', post)

// connection

const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_URL
mongoose.set('bufferCommands', true)
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('database connected')
    app.listen(PORT, () => {
      console.log('server is running at port 5000')
    })
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error)
  })

  // just checking