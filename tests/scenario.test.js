const request = require('supertest')
const app = require('../server').app
const server = require('../server').server

describe('Scenario routes', () => {
  let token = null
  let scenarioUuid = null

  test('should return all scenarios', async done => {
    const res = await request(app)
      .post('/scenarios', {
        oos: [],
      })
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('scenarios')
    expect(res.body.scenarios.length).toBeGreaterThanOrEqual(1)

    scenarioUuid = res.body.scenarios[0].uuid

    done()
  })

  test('should return a scenario', async done => {
    const res = await request(app)
      .get(`/scenarios/${scenarioUuid}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('scenario')

    done()
  })

  beforeAll(async done => {
    await request(app)
      .post('/register')
      .send({
        username: 'Test',
        password: 'testtest',
        email: 'test@test.com',
      })

    const res = await request(app)
      .post('/login')
      .send({
        username: 'Test',
        password: 'testtest',
      })

    token = res.body.token

    done()
  })

  afterAll(done => {
    server.close()
    done()
  })
})
