const passport = require('passport')
const { Op } = require('sequelize')

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
   * @apiHeader {String} Authorization User JWT.
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
   * @apiHeader {String} Authorization User JWT.
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
      /* istanbul ignore next */
      if (!req.user) res.status(404).send({ message: 'Unauthorized' })

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
        order: [
          [Oo, 'id', 'ASC'],
          [Oo, 'createdAt', 'ASC'],
        ],
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

  /**
   * @api {post} /feedbacks Create a feedback
   * @apiName Create Feedback
   * @apiGroup Feedback
   *
   * @apiHeader {String} Authorization User JWT.
   *
   * @apiSuccess {Object} feedback Feedback created
   *
   * @apiParam {Number[]} oos ID of the Oos used
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
   * @apiErrorExample Missing Oos:
   *     HTTP/1.1 400 BadRequest
   *     {
   *       "message": "Oos are missing"
   *     }
   *
   * @apiErrorExample Unauthorized:
   *     HTTP/1.1 401 Unauthorized
   *     {
   *       "message": "Unauthorized"
   *     }
   */
  app.post(
    '/feedbacks',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      if (!req.body.oos || req.body.oos.length === 0)
        return res.status(400).send({ message: 'Oos are missing' })

      const oos = await Oo.findAll({
        where: {
          id: {
            [Op.in]: req.body.oos,
          },
        },
        attributes: ['id'],
      })

      const feedback = await Feedback.create({
        status: null,
        oos: oos,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: req.user.id,
      })

      await feedback.setOos(oos)

      const populatedFeedback = await Feedback.findOne({
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
          id: feedback.id,
        },
        order: [
          [Oo, 'id', 'ASC'],
          [Oo, 'createdAt', 'ASC'],
        ],
      })

      res.send({ feedback: populatedFeedback })
    },
  )

  /**
   * @api {post} /feedbacks/:id Edit a feedback
   * @apiName Edit Feedback
   * @apiGroup Feedback
   *
   * @apiHeader {String} Authorization User JWT.
   *
   * @apiSuccess {Object} feedback Feedback updated
   *
   * @apiParam {Boolean} status New status of the feedback
   * @apiParam {Number} id ID of the feedback
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
   * @apiErrorExample Missing status:
   *     HTTP/1.1 400 BadRequest
   *     {
   *       "message": "Status is missing"
   *     }
   *
   * @apiErrorExample Unauthorized:
   *     HTTP/1.1 401 Unauthorized
   *     {
   *       "message": "Unauthorized"
   *     }
   *
   * @apiErrorExample Wrong ID:
   *     HTTP/1.1 400 BadRequest
   *     {
   *       "message": "Feedback not found"
   *     }
   */
  app.post(
    '/feedbacks/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Feedback.findOne({
        attributes: ['id', 'userId', 'createdAt', 'status'],
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
          },
        ],
        order: [
          [Oo, 'id', 'ASC'],
          [Oo, 'createdAt', 'ASC'],
        ],
      }).then(async feedback => {
        if (!feedback)
          return res.status(400).send({ message: 'Feedback not found' })

        if (feedback.userId !== req.user.id)
          return res.status(401).send({ message: 'Unauthorized' })

        if (req.body.status === undefined)
          return res.status(400).send({ message: 'Status is missing' })

        await Feedback.update(
          {
            status: req.body.status,
          },
          {
            where: {
              id: feedback.id,
            },
          },
        )

        await feedback.reload()

        feedback.userId = undefined

        res.send({ feedback })
      })
    },
  )
}
