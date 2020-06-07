const request = require('supertest')
const app = require('../server').app
const server = require('../server').server

describe('Scenario routes', () => {
  test('should return all scenarios', async done => {
    const res = await request(app).post('/scenarios', {
      oos: [],
    })

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('scenarios')
    // expect(res.body.scenarios.length).toBeGreaterThanOrEqual(2)

    done()
  })

  afterAll(done => {
    server.close()
    done()
  })
})
