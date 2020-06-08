const Scenario = require('../schemas/Scenario').Scenario
const passport = require('passport')

module.exports = app => {
  /**
   * @api {post} /scenarios Get all scenarios
   * @apiName List
   * @apiGroup Scenario
   *
   * @apiHeader {String} Authorization User JWT.
   *
   * @apiParam {String[]} oos Oos available
   *
   * @apiSuccess {Object[]} scenarios Scenarios available with these Oos
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *        "scenarios": [
   *            {
   *                "uuid": "71e735cd-7c22-473c-bde7-8296fee62da4",
   *                "name": "Scénario de test",
   *                "oos": [],
   *                "sentences": [],
   *                "entries": [],
   *                "exits": []
   *            }
   *        ]
   *     }
   *
   * @apiErrorExample Unauthorized:
   *     HTTP/1.1 401 Unauthorized
   *     {
   *       "message": "Unauthorized"
   *     }
   */
  app.post(
    '/scenarios',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Scenario.findAll({
        // where: {
        //   '$oos.id$': {
        //     [Op.in]: req.body.oos,
        //   },
        // },
      }).then(scenarios => {
        res.send({ scenarios })
      })
    },
  )

  /**
   * @api {get} /scenarios/:uuid Get a scenario
   * @apiName Get
   * @apiGroup Scenario
   *
   * @apiHeader {String} Authorization User JWT.
   *
   * @apiSuccess {Object[]} scenarios Scenario requested
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *        "scenario": {
   *            "uuid": "71e735cd-7c22-473c-bde7-8296fee62da4",
   *            "name": "Scénario de test",
   *            "oos": [],
   *            "sentences": [],
   *            "entries": [],
   *            "exits": []
   *         }
   *     }
   *
   * @apiErrorExample Unauthorized:
   *     HTTP/1.1 401 Unauthorized
   *     {
   *       "message": "Unauthorized"
   *     }
   */
  app.get(
    '/scenarios/:uuid',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Scenario.findOne({
        where: { uuid: req.params.uuid },
      }).then(scenario => {
        res.send({ scenario })
      })
    },
  )
}
