const request = require('supertest')
const app = require('../server').app
const server = require('../server').server
const User = require('../schemas/User')
const Feedback = require('../schemas/Feedback').Feedback

describe('Feedback routes', () => {
  let token = null

  test('should create a feedback', async done => {
    const res = await request(app)
      .post('/feedbacks')
      .send({
        oos: [1, 2, 3],
      })
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('feedback')
    expect(res.body.feedback).toHaveProperty('oos')
    expect(res.body.feedback.oos.length).toEqual(3)
    done()
  })

  beforeAll(async done => {
    await request(app).post('/register').send({
      username: 'Test',
      password: 'testtest',
      email: 'test@test.com',
    })

    const res = await request(app).post('/login').send({
      username: 'Test',
      password: 'testtest',
    })

    token = res.body.token

    done()
  })

  afterAll(async done => {
    await User.destroy({
      where: {
        username: 'Test',
      },
    })

    server.close()
    done()
  })
})
