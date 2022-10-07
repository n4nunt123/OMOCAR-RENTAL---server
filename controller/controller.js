const {OAuth2Client} = require('google-auth-library')
const { Transportation, User, Type, History } = require('../models')
const { comparePassword, generateToken } = require('../helper/helper')

class Controller {
  static async findAll(req, res, next) {
    try {
      let result = await Transportation.findAll({
        order: [['id', 'ASC']],
        include: [
          { model: User, attributes: { exclude: ['password'] } },
          { model: Type }
        ]
      })

      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  static async create(req, res, next) {
    try {
      const { name, description, imgUrl, location, price, typeId } = req.body
      const { email } = req.user
      let input = await Transportation.create({
        name,
        description,
        imgUrl,
        location,
        price,
        typeId,
        status: 'Active',
        authorId: req.user.id
      })
      await History.create({
        name: 'Create',
        description: `New transportation data with id: ${input.id} has been created`,
        updatedBy: `${email}`
      })
      res.status(201).json({
        message: `SUCCESS input data with name: ${name} and id ${input.id}`
      })
    } catch (err) {
      next(err)
    }
  }

  static async findById(req, res, next) {
    try {
      const id = req.params.id
      let result = await Transportation.findByPk(id)

      if (result) {
        res.status(200).json(result)
      } else {
        throw { name: `Error404`}
      }
    } catch (err) {
      next(err)
    }
  }

  static async delete(req, res, next) {  
    try {
      const { email } = req.user
      const id = req.params.id
      let item = await Transportation.findByPk(id)
      let result = await Transportation.destroy({ where: { id } })
      if (result !== 0) {
        await History.create({
          name: 'Delete',
          description: `Transportation data with id: ${id} has been deleted`,
          updatedBy: `${email}`
        })
        res.status(200).json({
          message: `SUCCESS delete data with id ${id}`
        })
      } else {
        throw { name: `Error404`}
      }
    } catch (err) {
      next(err)
    }
  }

  static async register(req, res, next) {
    try {
      const { username, password, email, phoneNumber, address } = req.body
      let input = await User.create({
        username,
        password,
        email,
        phoneNumber,
        address,
        role: 'Admin'
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

  static async findType(req, res, next) {
    try {
      let result = await Type.findAll()
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  static async findUser(req, res, next) {
    try {
      const { id } = req.user
      let result = await User.findByPk(id, { attributes: { exclude: ['password'] } })
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  static async createType(req, res, next) {
    try {
      const { name } = req.body
      const { email } = req.user
      let input = await Type.create({ name })
      await History.create({
        name: 'Create',
        description: `New Type data with id: ${input.id} has been created`,
        updatedBy: `${email}`
      })
      res.status(201).json({
        message: `SUCCESS input data with id ${input.id}`
      })
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
          role: 'Staff',
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

  static async deleteType(req, res, next) {
    try {
      const id = req.params.id
      const { email } = req.user
      let result = await Type.destroy({ where: { id } })
      if (result !== 0) {
        await History.create({
          name: 'Delete',
          description: `Type data with id: ${id} has been deleted`,
          updatedBy: `${email}`
        })
        res.status(200).json({
          message: `SUCCESS delete data with id ${id}`
        })
      } else {
        throw { name: `Error404`}
      }
    } catch (err) {
      next(err)
    }
  }

  static async updateTransportations(req, res, next) {
    try {
      const { id } = req.params
      const { email } = req.user
      const { name, description, imgUrl, location, price, status, typeId } = req.body
      let update = await Transportation.update({
        name,
        description,
        imgUrl,
        location,
        price,
        typeId,
      }, { where: { id } })

      if (update[0] !== 0) {
        await History.create({
          name: 'Update',
          description: `Transportation data with id: ${id} has been updated`,
          updatedBy: `${email}`
        })
        res.status(201).json({
          message: `SUCCESS update data with name: ${name} and id ${id}`
        })
      } else {
        throw { name: `Error404`}
      }
    } catch (err) {
      next(err)
    }
  }

  static async updateType(req, res, next) {
    try {
      const { id } = req.params
      const { email } = req.user
      const { name } = req.body
      let update = await Type.update({ name }, { where: { id } })

      if (update[0] !== 0) {
        await History.create({
          name: 'Update',
          description: `Type data with id: ${id} has been updated`,
          updatedBy: `${email}`
        })
        res.status(201).json({
          message: `SUCCESS update data with name: ${name} and id ${id}`
        })
      } else {
        throw { name: `Error404`}
      }
    } catch (err) {
      next(err)
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { id } = req.params
      const { email } = req.user
      const { status } = req.body
      let data = await Transportation.findByPk(id)
      let update = await Transportation.update({ status }, { where: { id } })

      if (update[0] !== 0) {
        await History.create({
          name: 'Update',
          description: `Transportation status data with id: ${id} has been updated from ${data.status} to ${status}`,
          updatedBy: `${email}`
        })
        res.status(201).json({
          message: `SUCCESS update data with status: ${status} and id ${id}`
        })
      } else {
        throw { name: `Error404`}
      }
    } catch (err) {
      next(err)
    }
  }

  static async history(req, res, next) {
    try {
      let result = await History.findAll()
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = Controller