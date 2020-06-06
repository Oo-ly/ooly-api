const User = require('../schemas/User')
const passport = require('passport')

const Oo = require('../schemas/Oo')
const Feedback = require('../schemas/Feedback').Feedback
const UserSuggestion = require('../schemas/Suggestion').UserSuggestion

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
              through: {
                attributes: [],
              },
              order: ['id', 'ASC'],
            },
          ],
          order: ['id', 'ASC'],
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
  app.get('/users/:id([0-9]+)', (req, res) => {
    User.findOne({
      attributes: ['id', 'username', 'email'],
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Oo,
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
              through: {
                attributes: [],
              },
              order: ['id', 'ASC'],
            },
          ],
          order: ['id', 'ASC'],
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

  /**
   * @api {get} /users/me Current user detail
   * @apiName User me
   * @apiGroup User
   *
   * @apiHeader {String} Authorization User JWT.
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
   *                "lastname": "Test",
   *                "firstname": "Test",
   *                "surname": "Test",
   *                "age": 20,
   *                "imei": "010101010101",
   *                "sleepHour": "23:30",
   *                "activities": "[\"Musique\",\"Jeux\",\"Humour\",\"Informations\"]",
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
  app.get(
    '/users/me',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      User.findOne({
        attributes: [
          'id',
          'username',
          'email',
          'lastname',
          'firstname',
          'surname',
          'age',
          'imei',
          'sleepHour',
          'activities',
        ],
        where: {
          id: req.user.id,
        },
        include: [
          {
            model: Oo,
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
        res.send({
          user,
        })
      })
    },
  )

  /**
   * @api {get} /users/suggestions User suggestions
   * @apiName Suggestions
   * @apiGroup User
   *
   * @apiHeader {String} Authorization User JWT.
   *
   * @apiSuccess {Object[]} user User suggestions
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "suggestions": [
   *            {
   *                "weight": 8.9480459683016,
   *                "updatedAt": "2020-05-01T14:09:43.000Z",
   *                "oo": {}
   *            }
   *       ]
   *     }
   *
   * @apiErrorExample Unauthorized:
   *     HTTP/1.1 400 BadRequest
   *     {
   *       "message": "Unauthorized"
   *     }
   */
  app.get(
    '/users/suggestions',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      UserSuggestion.findAll({
        attributes: ['weight', 'updatedAt'],
        where: {
          userId: req.user.id,
        },
        include: [
          {
            model: Oo,
            attributes: ['id', 'name', 'description'],
          },
        ],
        order: [['weight', 'DESC']],
      }).then(suggestions => {
        res.send({ suggestions })
      })
    },
  )
}
