const User = require('../schemas/User')
const passport = require('passport')

const OoSuggestion = require('../schemas/Suggestion').OoSuggestion
const AudioSuggestion = require('../schemas/Suggestion').AudioSuggestion
const Scenario = require('../schemas/Scenario').Scenario
const Audio = require('../schemas/Audio')

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
    User.findAll().then(users => {
      res.send({ users })
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
  app.get('/users/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findOne({
      where: { uuid: req.user.uuid },
    }).then(user => {
      res.send({ user })
    })
  })

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
  app.get('/users/suggestions/oos', passport.authenticate('jwt', { session: false }), (req, res) => {
    OoSuggestion.findAll({
      where: { userUuid: req.user.uuid },
      group: ['suggestedOoUuid'],
      order: [
        ['weight', 'DESC'],
        ['createdAt', 'DESC'],
      ],
    }).then(suggestions => {
      res.send({ suggestions })
    })
  })

  /**
   * @api {get} /users/suggestions/scenarios User suggestions
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
   *                "scenario_sentence": {}
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
  app.get('/users/suggestions/scenarios', passport.authenticate('jwt', { session: false }), (req, res) => {
    AudioSuggestion.scope(null)
      .findAll({
        where: { userUuid: req.user.uuid },
        include: [
          {
            model: Audio.scope(null),
            attributes: ['uuid', 'name', 'type', 'createdAt'],
            include: [Scenario.scope(null)],
          },
        ],
        group: ['audio.audibleUuid'],
        order: [
          ['weight', 'DESC'],
          ['createdAt', 'DESC'],
        ],
      })
      .then(suggestions => {
        res.send({ suggestions })
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
  app.get('/users/:uuid', (req, res) => {
    User.findOne({ where: { uuid: req.params.uuid } }).then(user => {
      if (user) {
        res.send({ user })
      } else {
        res.status(400).send({ message: 'User not found' })
      }
    })
  })
}
