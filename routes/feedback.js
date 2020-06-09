const passport = require('passport')
const { Op } = require('sequelize')

const { v4: uuidv4 } = require('uuid')

const Oo = require('../schemas/Oo')
const Feedback = require('../schemas/Feedback')

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
   *                "sentence": {},
   *            }
   *        ]
   *     }
   */
  app.get('/feedbacks', passport.authenticate('jwt', { session: false }), (req, res) => {
    Feedback.findAll({
      where: { userUuid: req.user.uuid },
    }).then(feedbacks => {
      res.send({ feedbacks })
    })
  })

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
   *                "sentence": {},
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
  app.get('/feedbacks/:uuid', passport.authenticate('jwt', { session: false }), (req, res) => {
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
  })

  /**
   * @api {post} /feedbacks Create a feedback
   * @apiName Create Feedback
   * @apiGroup Feedback
   *
   * @apiHeader {String} Authorization User JWT.
   *
   * @apiSuccess {Object} feedback Feedback created
   *
   * @apiParam {string} sentence UUID of the sentence
   * @apiParam {boolean} status Status (like or dislike)
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
  app.post('/feedbacks', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (!req.body.sentence) return res.status(400).send({ message: 'Sentence is missing' })

    const feedback = await Feedback.create({
      uuid: uuidv4(),
      status: req.body.status,
      createdAt: new Date(),
      updatedAt: new Date(),
      userUuid: req.user.uuid,
      sentenceUuid: req.body.sentence,
    })

    const populatedFeedback = await Feedback.findOne({
      where: { uuid: feedback.uuid },
    })

    res.send({ feedback: populatedFeedback })
  })
}
