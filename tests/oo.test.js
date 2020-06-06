const request = require('supertest')
const app = require('../server').app
const server = require('../server').server

describe('Oo routes', () => {
  test('should return all Oos', async done => {
    const res = await request(app).get('/oos')

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('oos')
    expect(res.body.oos.length).toBeGreaterThanOrEqual(7)

    done()
  })

  test('should return an unique Oo', async done => {
    const res = await request(app).get('/oos/1')

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('oo')
    expect(res.body.oo).toStrictEqual({
      id: 1,
      name: "Disc'Oo",
      description:
        'Disc’Oo adore la musique. Il est super calé, il connait pleins d’artistes différents et il aime tous les styles. Parfois d’humeur à réécouter les classiques et parfois voulant plutôt découvrir de nouveaux morceaux, Disc’Oo trouve toujours une musique à écouter et à partager. C’est d’ailleurs très important pour lui, de partager. Il adore créer une bonne ambiance pour tous ceux qui l’accompagnent.',
      color: '#0085FF',
      objectName: 'Disc_Oo',
      toreObjectName: 'Tore_3',
      isAvailable: true,
    })
    done()
  })

  test('should fail to find an oo', async done => {
    const res = await request(app).get('/oos/1000')

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
