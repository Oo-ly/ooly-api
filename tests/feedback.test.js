const request = require('supertest')
const app = require('../server').app
const server = require('../server').server
const User = require('../schemas/User')
const Feedback = require('../schemas/Feedback').Feedback

describe('Feedback routes', () => {
  let token = (feedback = null)

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
    expect(res.body.feedback.oos.length).toBeGreaterThanOrEqual(3)

    feedback = res.body.feedback

    done()
  })

  test('should not create a feedback with wrong JWT', async done => {
    const res = await request(app)
      .post('/feedbacks')
      .send({
        oos: [1, 2, 3],
      })
      .set('Authorization', `Bearer bad${token}`)

    expect(res.status).toEqual(401)
    expect(res.text).toEqual('Unauthorized')
    done()
  })

  test('should not create a feedback with no Oo', async done => {
    const res = await request(app)
      .post('/feedbacks')
      .send({})
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toEqual('Oos are missing')
    done()
  })

  test('should list feedbacks', async done => {
    const res = await request(app)
      .get('/feedbacks')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('feedbacks')
    expect(res.body.feedbacks.length).toEqual(1)
    expect(res.body.feedbacks[0]).toEqual(feedback)
    done()
  })

  test('should get specific feedback', async done => {
    const res = await request(app)
      .get(`/feedbacks/${feedback.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('feedback')
    expect(res.body.feedback).toEqual(feedback)
    done()
  })

  test('should not get feedback that does not exists', async done => {
    const res = await request(app)
      .get(`/feedbacks/10000`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toEqual('Feedback not found')
    done()
  })

  test('should not get feedback that belongs to another user', async done => {
    await request(app).post('/register').send({
      username: 'Test2',
      password: 'testtest',
      email: 'test@test.com',
    })

    const newlyCreatedUser = await request(app).post('/login').send({
      username: 'Test2',
      password: 'testtest',
    })

    const otherUserFeedback = await request(app)
      .post('/feedbacks')
      .send({ oos: [1, 2, 3] })
      .set('Authorization', `Bearer ${newlyCreatedUser.body.token}`)

    const res = await request(app)
      .get(`/feedbacks/${otherUserFeedback.body.feedback.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toEqual(401)
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toEqual('Unauthorized')

    await User.destroy({
      where: {
        username: 'Test2',
      },
    })

    done()
  })

  test('should not update feedback that belongs to another user', async done => {
    await request(app).post('/register').send({
      username: 'Test2',
      password: 'testtest',
      email: 'test@test.com',
    })

    const newlyCreatedUser = await request(app).post('/login').send({
      username: 'Test2',
      password: 'testtest',
    })

    const otherUserFeedback = await request(app)
      .post('/feedbacks')
      .send({ oos: [1, 2, 3] })
      .set('Authorization', `Bearer ${newlyCreatedUser.body.token}`)

    const res = await request(app)
      .post(`/feedbacks/${otherUserFeedback.body.feedback.id}`)
      .send({ status: true })
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toEqual(401)
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toEqual('Unauthorized')

    await User.destroy({
      where: {
        username: 'Test2',
      },
    })

    done()
  })

  test('should update status of a feedback', async done => {
    const res = await request(app)
      .post(`/feedbacks/${feedback.id}`)
      .send({ status: true })
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('feedback')
    expect(res.body.feedback).toHaveProperty('status')
    expect(res.body.feedback.status).toEqual(true)
    done()
  })

  test('should refused update status of a feedback if empty', async done => {
    const res = await request(app)
      .post(`/feedbacks/${feedback.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toEqual('Status is missing')
    done()
  })

  test('should refused update status of a feedback that does not exists', async done => {
    const res = await request(app)
      .post(`/feedbacks/10000`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toEqual('Feedback not found')
    done()
  })

  test('should get suggestions', async done => {
    const res = await request(app)
      .get(`/users/suggestions`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('suggestions')
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
