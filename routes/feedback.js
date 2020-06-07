const passport = require('passport')
const { Op } = require('sequelize')

const { v4: uuidv4 } = require('uuid')

const Oo = require('../schemas/Oo')
const Feedback = require('../schemas/Feedback').Feedback

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
        where: { userUuid: req.user.uuid },
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
    '/feedbacks/:uuid',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      /* istanbul ignore next */
      if (!req.user) res.status(404).send({ message: 'Unauthorized' })

      Feedback.findOne({
        where: { uuid: req.params.uuid },
      }).then(feedback => {
        if (feedback) {
          if (feedback.userUuid === req.user.uuid) {
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

      const oos = await Oo.scope(null).findAll({
        where: {
          uuid: { [Op.in]: req.body.oos },
        },
        attributes: ['uuid'],
      })

      const feedback = await Feedback.create({
        uuid: uuidv4(),
        status: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        userUuid: req.user.uuid,
      })

      await feedback.setFeedOos(oos)

      const populatedFeedback = await Feedback.findOne({
        where: { uuid: feedback.uuid },
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
    '/feedbacks/:uuid',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Feedback.findOne({
        where: { uuid: req.params.uuid },
      }).then(async feedback => {
        if (!feedback)
          return res.status(400).send({ message: 'Feedback not found' })

        if (feedback.userUuid !== req.user.uuid)
          return res.status(401).send({ message: 'Unauthorized' })

        if (req.body.status === undefined)
          return res.status(400).send({ message: 'Status is missing' })

        await Feedback.update(
          { status: req.body.status },
          { where: { uuid: feedback.uuid } },
        )

        await feedback.reload()

        feedback.userUuid = undefined

        res.send({ feedback })
      })
    },
  )
}
