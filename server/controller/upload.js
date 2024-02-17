const UserSchema = require('../model/UserSchema')

const uploadProfilePic = async (req, res) => {
  console.log('generated here', req.body.file)
  const id = req.user.id
  try {
    const data = await UserSchema.findByIdAndUpdate(id, {
      profileImage: req.body.file,
    })
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = {
  uploadProfilePic,
}
