const request = require('supertest')
const app = require('../index')
const { sequelize } = require('../models')
const { generateToken, verifyToken } = require('../helper/helper')
const { queryInterface } = sequelize

let access_token
let access_token_admin

beforeAll(async () => {
  // Customer
  const email = 'test03@mail.com'
  const data = await queryInterface.rawSelect('Users', { where: { email } }, ['id'])
  const payload = { id: data }
  access_token = generateToken(payload)
  const validationToken = verifyToken(access_token)

  console.log(payload) // number (id)
  console.log(access_token) // access_token
  console.log(validationToken) // boolean

  // Admin id:3
  const payloadA = { id: 3 }
  access_token_admin = generateToken(payloadA)
})


describe('POST /public/register', () => {
  test('POST /public/register ===> success test', async () => {
    const payload = {
      email: 'test629@mail.com',
      password: 'test69',
      username: 'test69',
      role: 'Customer',
      phoneNumber: '072072082',
      address: 'dimana aja terserah'
    }

    const response = await request(app)
      .post('/public/register')
      .send(payload)
    expect(response.status).toBe(201)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message')
  })

  test('POST /public/register ===> error test email already registered', async () => {
    const payload = {
      email: 'test01@mail.com',
      password: 'test01',
      username: 'test01',
      role: 'Customer',
      phoneNumber: '072072082',
      address: 'dimana aja terserah'
    }

    const response = await request(app)
      .post('/public/register')
      .send(payload)
    expect(response.status).toBe(409)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', 'User already exist')
  })

  test('POST /public/register ===> error test while email is null', async () => {
    const payload = {
      email: '',
      password: 'test10',
      username: 'test10',
      role: 'Customer',
      phoneNumber: '072072082',
      address: 'dimana aja terserah'
    }

    const response = await request(app)
      .post('/public/register')
      .send(payload)
    expect(response.status).toBe(400)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', ['Email is required', 'Input must be email'])
  })

  test('POST /public/register ===> error test while email is not email', async () => {
    const payload = {
      email: 'test01',
      password: 'test10',
      username: 'test10',
      role: 'Customer',
      phoneNumber: '072072082',
      address: 'dimana aja terserah'
    }

    const response = await request(app)
      .post('/public/register')
      .send(payload)
    expect(response.status).toBe(400)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', ['Input must be email'])
  })

  test('POST /public/register ===> error test while password is null', async () => {

    const payload = {
      email: 'test10@mail.com',
      password: '',
      username: 'test10',
      role: 'Customer',
      phoneNumber: '072072082',
      address: 'dimana aja terserah'
    }

    const response = await request(app)
      .post('/public/register')
      .send(payload)
    expect(response.status).toBe(400)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', ['Password required', 'Password minimal 5 character'])

  })

  test('POST /public/register ===> error test while password less then 5', async () => {

    const payload = {
      email: 'test10@mail.com',
      password: 'test',
      username: 'test10',
      role: 'Customer',
      phoneNumber: '072072082',
      address: 'dimana aja terserah'
    }

    const response = await request(app)
      .post('/public/register')
      .send(payload)
    expect(response.status).toBe(400)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', ['Password minimal 5 character'])

  })

  test('POST /public/register ===> error test while username is null', async () => {

    const payload = {
      email: 'test10@mail.com',
      password: 'test10',
      username: '',
      role: 'Customer',
      phoneNumber: '072072082',
      address: 'dimana aja terserah'
    }

    const response = await request(app)
      .post('/public/register')
      .send(payload)
    expect(response.status).toBe(400)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', ['Username required'])

  })

  test('POST /public/register ===> error test while phone number is not number', async () => {

    const payload = {
      email: 'test10@mail.com',
      password: 'test10',
      username: 'test10',
      role: 'Customer',
      phoneNumber: 'asdasd',
      address: 'dimana aja terserah'
    }

    const response = await request(app)
      .post('/public/register')
      .send(payload)
    expect(response.status).toBe(400)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', ['Phone number must be a number'])

  })
})

describe('POST /public/login', () => {
  test('POST /public/login ===> success test', async () => {
    const payload = {
      email: 'test01@mail.com',
      password: 'test01'
    }

    const response = await request(app)
      .post('/public/login')
      .send(payload)
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('access_token', expect.any(String))
  })

  test('POST /public/login ===> error test when password null', async () => {
    const payload = {
      email: 'test01@mail.com',
      password: ''
    }

    const response = await request(app)
      .post('/public/login')
      .send(payload)
    expect(response.status).toBe(401)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', 'Error Email or Password Invalid')
  })

  test('POST /public/login ===> error test when email null', async () => {
    const payload = {
      email: '',
      password: 'test01'
    }

    const response = await request(app)
      .post('/public/login')
      .send(payload)
    expect(response.status).toBe(401)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', 'Error Email or Password Invalid')
  })

  test('POST /public/login ===> error test when invalid password', async () => {
    const payload = {
      email: 'test01@mail.com',
      password: 'test02'
    }

    const response = await request(app)
      .post('/public/login')
      .send(payload)
    expect(response.status).toBe(401)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', 'Error Email or Password Invalid')
  })

  test('POST /public/login ===> error test when password null and email null', async () => {
    const payload = {
      email: '',
      password: ''
    }

    const response = await request(app)
      .post('/public/login')
      .send(payload)
    expect(response.status).toBe(401)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', 'Error Email or Password Invalid')
  })
})

describe('GET /public/transportation', () => {
  test('GET /public/transportation ===> success test', async () => {

    const response = await request(app)
      .get('/public/transportation')
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body.rows).toBeInstanceOf(Array)
    expect(response.body.rows[0]).toHaveProperty('id', expect.any(Number))
    expect(response.body.rows[0]).toHaveProperty('User', expect.any(Object))
    expect(response.body.rows[0]).toHaveProperty('Type', expect.any(Object))
  })
})

describe('GET /public/transportation/:tranportationId', () => {
  test('GET /public/transportation/:tranportationId ===> success test', async () => {

    const response = await request(app)
      .get('/public/transportation/1')
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
  })

  test('GET /public/transportation/:tranportationId ===> error data not found test', async () => {

    const response = await request(app)
      .get('/public/transportation/9999')
    expect(response.status).toBe(404)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', 'Error Data Not Found')
  })
})

describe('POST /public/wishlist/:tranportationId', () => {
  test('POST /public/wishlist/:tranportationId ===> success test', async () => {

    const response = await request(app)
      .post('/public/wishlist/21')
      .set('access_token', access_token)
    expect(response.status).toBe(201)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  test('POST /public/wishlist/:tranportationId ===> error transportation already in whishlist test', async () => {

    const response = await request(app)
      .post('/public/wishlist/1')
      .set('access_token', access_token)
    expect(response.status).toBe(409)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', 'You Have Already Wishlist This Transportation')
  })

  test('POST /public/wishlist/:tranportationId ===> error transportation data not found test', async () => {

    const response = await request(app)
      .post('/public/wishlist/99999')
      .set('access_token', access_token)
    expect(response.status).toBe(404)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', 'Error Data Not Found')
  })

  test('POST /public/wishlist/:tranportationId ===> error token is null test', async () => {

    const response = await request(app)
      .post('/public/wishlist/1')
    expect(response.status).toBe(401)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', 'Please Login First')
  })

  test('POST /public/wishlist/:tranportationId ===> error invalid token test', async () => {

    const response = await request(app)
      .post('/public/wishlist/1')
      .set('access_token', 'invalid access token')
    expect(response.status).toBe(401)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', 'Invalid Token')
  })

  test('POST /public/wishlist/:tranportationId ===> error role is not Customer test', async () => {

    const response = await request(app)
      .post('/public/wishlist/1')
      .set('access_token', access_token_admin)
    expect(response.status).toBe(401)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', 'Only Customer Can Bookmark the Products')
  })
})

describe('GET /public/wishlist', () => {
  test('GET /public/wishlist ===> success test', async () => {
    const response = await request(app)
      .get('/public/wishlist')
      .set('access_token', access_token)
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body).toBeInstanceOf(Object)

    if (response.body[0]) {
      expect(response.body[0]).toHaveProperty('id', expect.any(Number))
      expect(response.body[0]).toHaveProperty('Transportation', expect.any(Object))
    }
  })

  test('GET /public/wishlist ===> error invalid token test', async () => {
    const response = await request(app)
      .get('/public/wishlist')
      .set('access_token', 'invalid access token')
    expect(response.status).toBe(401)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', 'Invalid Token')
  })

  test('GET /public/wishlist ===> error token is null test', async () => {
    const response = await request(app)
      .get('/public/wishlist')
    expect(response.status).toBe(401)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', 'Please Login First')
  })
})