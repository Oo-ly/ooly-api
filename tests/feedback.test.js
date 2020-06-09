const request = require('supertest')
const app = require('../server').app
const server = require('../server').server
const User = require('../schemas/User')

describe('Feedback routes', () => {
  let token = (feedback = null)

  let sentence = null

  test('should create a feedback', async done => {
    const res = await request(app)
      .post('/feedbacks')
      .send({
        sentence: sentence.uuid,
        status: true,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('feedback')

    feedback = res.body.feedback

    done()
  })

  test('should not create a feedback with wrong JWT', async done => {
    const res = await request(app)
      .post('/feedbacks')
      .send({
        sentence: sentence.uuid,
        status: true,
      })
      .set('Authorization', `Bearer bad${token}`)

    expect(res.status).toEqual(401)
    expect(res.text).toEqual('Unauthorized')
    done()
  })

  test('should not create a feedback with no sentence', async done => {
    const res = await request(app).post('/feedbacks').send({}).set('Authorization', `Bearer ${token}`)

    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toEqual('Sentence is missing')
    done()
  })

  test('should list feedbacks', async done => {
    const res = await request(app).get('/feedbacks').set('Authorization', `Bearer ${token}`)

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('feedbacks')
    expect(res.body.feedbacks.length).toEqual(1)
    expect(res.body.feedbacks[0]).toMatchObject(feedback)
    done()
  })

  test('should get specific feedback', async done => {
    const res = await request(app).get(`/feedbacks/${feedback.uuid}`).set('Authorization', `Bearer ${token}`)

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('feedback')
    expect(res.body.feedback).toMatchObject(feedback)
    done()
  })

  test('should not get feedback that does not exists', async done => {
    const res = await request(app)
      .get(`/feedbacks/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa`)
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
      .send({ sentence: sentence.uuid, status: true })
      .set('Authorization', `Bearer ${newlyCreatedUser.body.token}`)

    const res = await request(app)
      .get(`/feedbacks/${otherUserFeedback.body.feedback.uuid}`)
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

  test('should get suggestions', async done => {
    const res = await request(app).get(`/users/suggestions`).set('Authorization', `Bearer ${token}`)

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

    const res2 = await request(app)
      .post('/scenarios')
      .send({})
      .set('Authorization', `Bearer ${token}`)
      .catch(err => {
        console.log('Error', err)
      })

    sentence = res2.body.scenarios[0].sentences[0]

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
