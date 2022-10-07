const { User } = require('../models')
const { verifyToken } = require('../helper/helper')

let authentification = async (req, res, next) => {
  try {
    const { access_token } = req.headers
    if (!access_token) {
      throw { name: 'tokenNotFound' }
    } else {
      const payload = verifyToken(access_token)
      const user = await User.findByPk(payload.id)

      if (!user) {
        throw { name: 'Invalid Token'}
      } else {
        req.user = {
          id: user.id,
          email: user.email,
          role: user.role,
          username: user.username
        }
        next()
      }
    }
  } catch (err) {
    next(err)
  }
}

module.exports = authentification
