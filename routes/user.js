const User = require('../schemas/User')

const Oo = require('../schemas/Oo')
const Feedback = require('../schemas/Feedback').Feedback

module.exports = app => {
  /**
   * @api {get} /users User list
   * @apiName User list
   * @apiGroup User
   *
   * @apiSuccess {Object[]} users List of users
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "users": [
   *            {
   *                "id": 1,
   *                "username": "Test",
   *                "email": "test@test.com",
   *                "oos": [],
   *                "feedbacks": [],
   *            }
   *        ]
   *     }
   */
  app.get('/users', (req, res) => {
    User.findAll({
      attributes: ['id', 'username', 'email'],
      include: [
        {
          model: Oo,
          attributes: ['id', 'name', 'description'],
          through: {
            attributes: [],
          },
        },
        {
          model: Feedback,
          attributes: ['id', 'status', 'createdAt'],
          include: [
            {
              model: Oo,
              attributes: ['id', 'name', 'description'],
              through: {
                attributes: [],
              },
            },
          ],
        },
      ],
      order: [
        ['id', 'ASC'],
        [Oo, 'id', 'ASC'],
        [Oo, 'createdAt', 'ASC'],
      ],
    }).then(users => {
      res.send({ users })
    })
  })

  /**
   * @api {get} /users/:id User detail
   * @apiName User
   * @apiGroup User
   *
   * @apiSuccess {Object} user User requested
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "user": {
   *                "id": 1,
   *                "username": "Test",
   *                "email": "test@test.com",
   *                "oos": [],
   *                "feedbacks": [],
   *            }
   *     }
   *
   * @apiErrorExample Wrong ID:
   *     HTTP/1.1 400 BadRequest
   *     {
   *       "message": "User not found"
   *     }
   */
  app.get('/users/:id', (req, res) => {
    User.findOne({
      attributes: ['id', 'username', 'email'],
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Oo,
          attributes: ['id', 'name', 'description'],
          through: {
            attributes: [],
          },
          order: [
            ['id', 'DESC'],
            ['createdAt', 'DESC'],
          ],
        },
        {
          model: Feedback,
          attributes: ['id', 'status', 'createdAt'],
          include: [
            {
              model: Oo,
              attributes: ['id', 'name', 'description'],
              through: {
                attributes: [],
              },
            },
          ],
        },
      ],
      order: [
        ['id', 'ASC'],
        [Oo, 'id', 'ASC'],
        [Oo, 'createdAt', 'ASC'],
      ],
    }).then(user => {
      if (user) {
        res.send({
          user,
        })
      } else {
        res.status(400).send({
          message: 'User not found',
        })
      }
    })
  })
}
