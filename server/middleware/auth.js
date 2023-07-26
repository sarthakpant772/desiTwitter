const jwt = require('jsonwebtoken');
function authenticateJWT(req, res, next) {
  const token = req.cookies.token

  if (token) {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403)
      }

      req.user = user
      next()
    })
  } else {
    res.sendStatus(401)
  }
}
