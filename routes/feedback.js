const passport = require('passport')

const User = require('../schemas/User')
const Oo = require('../schemas/Oo')
const Feedback = require('../schemas/Feedback').Feedback
const FeedbackOo = require('../schemas/Feedback').FeedbackOo

module.exports = app => {
  /**
   * @api {get} /feedbacks Feedback list
   * @apiName Feedback list
   * @apiGroup Feedback
   *
   * @apiSuccess {Object[]} feedbacks List of feedbacks of the logged users
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "feedbacks": [
   *            {
   *                "id": 1,
   *                "status": true,
   *                "createdAt": "2020-04-27T00:00:00.000Z",
   *                "oos": [],
   *            }
   *        ]
   *     }
   */
  app.get(
    '/feedbacks',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Feedback.findAll({
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
        where: {
          userId: req.user.id,
        },
      }).then(feedbacks => {
        res.send({ feedbacks })
      })
    },
  )

  /**
   * @api {get} /feedbacks/:id Feedback detail
   * @apiName Feedback
   * @apiGroup Feedback
   *
   * @apiSuccess {Object} feedback Feedback requested
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "feedback": {
   *                "id": 1,
   *                "status": true,
   *                "createdAt": "2020-04-27T00:00:00.000Z",
   *                "oos": [],
   *            }
   *     }
   *
   * @apiErrorExample Wrong ID:
   *     HTTP/1.1 400 BadRequest
   *     {
   *       "message": "Feedback not found"
   *     }
   *
   * @apiErrorExample Unauthorized:
   *     HTTP/1.1 401 Unauthorized
   *     {
   *       "message": "Unauthorized"
   *     }
   */
  app.get(
    '/feedbacks/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Feedback.findOne({
        attributes: ['id', 'status', 'createdAt', 'userId'],
        include: [
          {
            model: Oo,
            attributes: ['id', 'name', 'description'],
            through: {
              attributes: [],
            },
          },
        ],
        where: {
          id: req.params.id,
        },
      }).then(feedback => {
        if (feedback) {
          if (feedback.userId === req.user.id) {
            feedback.userId = undefined // We hide the ID of the user
            res.send({ feedback })
          } else {
            res.status(401).send({ message: 'Unauthorized' })
          }
        } else {
          res.status(400).send({ message: 'Feedback not found' })
        }
      })
    },
  )
}
