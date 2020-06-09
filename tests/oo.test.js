const request = require('supertest')
const app = require('../server').app
const server = require('../server').server

const oos = []

describe('Oo routes', () => {
  test('should return all Oos', async done => {
    const res = await request(app).get('/oos')

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('oos')
    expect(res.body.oos.length).toBeGreaterThanOrEqual(7)

    oos.push(...res.body.oos)

    done()
  })

  test('should return an unique Oo', async done => {
    const res = await request(app).get(`/oos/${oos[0].uuid}`)

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('oo')
    expect(res.body.oo).toMatchObject(oos[0])
    done()
  })

  test('should fail to find an oo', async done => {
    const res = await request(app).get('/oos/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa')

    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toBe('Oo not found')
    done()
  })

  afterAll(done => {
    server.close()
    done()
  })
})
