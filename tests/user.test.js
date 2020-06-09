const request = require('supertest')
const app = require('../server').app
const server = require('../server').server

let user = null

describe('User routes', () => {
  test('should return all users', async done => {
    const res = await request(app).get('/users')

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('users')
    expect(res.body.users.length).toBeGreaterThanOrEqual(50)

    user = res.body.users[0]

    done()
  })

  test('should return an unique user', async done => {
    const res = await request(app).get(`/users/${user.uuid}`)

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('user')
    expect(res.body.user).toMatchObject(user)
    done()
  })

  test('should fail to find an user', async done => {
    const res = await request(app).get('/users/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa')

    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toBe('User not found')
    done()
  })

  afterAll(done => {
    server.close()
    done()
  })
})
