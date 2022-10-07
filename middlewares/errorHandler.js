const { listErrrors } = require('../helper/helper')

let errorHandler = async (err, req, res, next) => {
  let errors = { code: 500, message: "Internal Server Error"}
  try {
    switch (err.name) {
      case 'SequelizeValidationError':
        errors.code = 400
        errors.message = listErrrors(err)
        throw errors

      case 'SequelizeUniqueConstraintError':
        errors.code = 409
        errors.message = 'User already exist'
        throw errors
    
      case 'Error404':
        errors.code = 404
        errors.message = 'Error Data Not Found'
        throw errors
      
      case 'invalidEmailPassword':
        errors.code = 401
        errors.message = 'Error Email or Password Invalid'
        throw errors

      case 'Invalid Token':
        errors.code = 401
        errors.message = 'Invalid Token'
        throw errors

      case 'Forbidden':
        errors.code = 403
        errors.message = 'Forbidden Authorization'
        throw errors

      case 'JsonWebTokenError':
        errors.code = 401
        errors.message = 'Invalid Token'
        throw errors

      case 'tokenNotFound':
        errors.code = 401
        errors.message = 'Please Login First'
        throw errors

      case 'alreadyBookmarked':
        errors.code = 409
        errors.message = 'You Have Already Wishlist This Transportation'
        throw errors

      case 'notCustomer':
        errors.code = 401
        errors.message = 'Only Customer Can Bookmark the Products'
        throw errors
    }
  } catch (err) {
    const { code, message } = errors
    res.status(code).json({ message })
  }
}

module.exports = errorHandler