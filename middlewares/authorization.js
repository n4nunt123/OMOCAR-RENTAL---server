const { User, Transportation } = require('../models')

let authorization = async (req, res, next) => {
    try {
    const { role } = req.user
    const { id } = req.params
    let data = await Transportation.findByPk(id)
    if (!data) {
      throw { name: 'Error4040' }
    } else if (role === 'Admin') {
      next()
    } else if (data.authorId === req.user.id) {
      next()
    } else {
      throw { name: 'Forbidden' }
    }
  } catch (err) {
    next(err)
  }
}

module.exports = authorization