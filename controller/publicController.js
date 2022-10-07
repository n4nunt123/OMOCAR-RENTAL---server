const { Transportation, User, Type, Bookmark } = require('../models')
const { comparePassword, generateToken, verifyToken } = require('../helper/helper')
const axios = require('axios')
const { Op } = require('sequelize')

class PublicController {
  static async register(req, res, next) {
    try {
      const { username, password, email, phoneNumber, address } = req.body
      let input = await User.create({
        username,
        password,
        email,
        phoneNumber,
        address,
        role: 'Customer'
      })
      res.status(201).json({
        message: `SUCCESS input data with email: ${email} with id ${input.id}`
      })
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      let data = await User.findOne({ where: { email } })
      if (!data) {
        throw { name: "invalidEmailPassword"}
      }
      
      let validationPassword = comparePassword(password, data.password)
      if (!validationPassword) {
        throw { name: "invalidEmailPassword"}
      }

      const payload = { id: data.id }
      const access_token = generateToken(payload)

      res.status(200).json({ access_token })
    } catch (err) {
      next(err)
    }
  }

  static async loginGoogle(req, res, next) {
    try {
      const { access_token } = req.headers

      const client = new OAuth2Client(process.env.CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: access_token,
        audience: process.env.CLIENT_ID
      });

      const payload = ticket.getPayload()
      const { name, email } = payload

      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          username: name,
          password: `SINGULARITY`,
          role: 'Customer',
        },
        hooks: false
      })
      
      const payload_local = { id: user.id }
      const access_token_local = generateToken(payload_local)

      res.status(200).json({ access_token: access_token_local })

    } catch (err) {
      next(err)
    }
  }

  static async findAll(req, res, next) {
    try {
      const query = req.query
      let filter = { status: 'Active' }
      let pagination = 0

      if (query.name) {
        filter = { name: { [Op.iLike]: `%${query.name}%` }, status: 'Active' }
      }

      if (query.page > 1) {
        pagination = (query.page - 1) * 9
      }

      let result = await Transportation.findAll({
        where: filter,
        limit: 9,
        offset: pagination,
        order: [['id', 'DESC']],
        include: [
          { model: User, attributes: { exclude: ['password'] } },
          { model: Type }
        ]
      })
      
      const count = await Transportation.count({ where: { status: 'Active' } })
      
      const response = {
        rows: result,
        totalData: count,
        totalPage: Math.ceil(count/9),
      }

      res.status(200).json(response)
    } catch (err) {
      next(err)
    }
  }

  static async findById(req, res, next) {
    try {
      const id = req.params.tranportationId
      let result = await Transportation.findOne({
        where: { id },
        include: Type
      })
      
      if (!result) {
        throw { name: `Error404`}
      }

      const data = {
        name: result.name,
        description: result.description,
        price: result.price,
        imgUrl: result.imgUrl,
        typeName: result.Type.name
      }

      if (data) {
        res.status(200).json(data)
      } else {
        throw { name: `Error404`}
      }
    } catch (err) {
      next(err)
    }
  }

  static async bookmark(req, res, next) {
    try {
      const UserId = req.user.id
      const { role } = req.user
      const TransportationId = req.params.tranportationId
      
      if (role !== 'Customer') {
        throw { name: 'notCustomer'}
      }

      const duplicate = await Bookmark.findOne({ where: {
        UserId,
        TransportationId
      }})

      const findTransportation = await Transportation.findByPk(TransportationId)

      if(duplicate) {
        throw { name: 'alreadyBookmarked' }
      } else if(!findTransportation) {
        throw { name: `Error404`}
      }

      await Bookmark.create({
        UserId,
        TransportationId
      })

      res.status(201).json({
        message: `SUCCESS transportation with id ${TransportationId} add on your wishlist`
      })
    } catch (err) {
      next(err)
    }
  }

  static async userBookmarked(req, res, next) {
    try {
      const UserId = req.user.id

      const data = await Bookmark.findAll({
        where: { UserId },
        include: [ Transportation ]
      })
      
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = PublicController