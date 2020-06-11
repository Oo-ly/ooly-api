const Scenario = require('../schemas/Scenario').Scenario
const passport = require('passport')
const Op = require('sequelize').Op

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
  app.post('/scenarios', passport.authenticate('jwt', { session: false }), (req, res) => {
    Scenario.findAll({}).then(allScenarios => {
      const scenarios = []

      allScenarios.map(scenario => {
        scenarios.push(scenario.toJSON())
      })

      let filteredScenarios = scenarios

      if (req.body.oos && req.body.oos.length > 0) {
        filteredScenarios = scenarios.filter(scenario => {
          const hasOos = scenario.oos.every(oo => {
            return req.body.oos.indexOf(oo.uuid) > -1
          })

          return hasOos
        })
      }

      res.send({ scenarios: filteredScenarios })
    })
  })

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
  app.get('/scenarios/:uuid', passport.authenticate('jwt', { session: false }), (req, res) => {
    Scenario.findOne({
      where: { uuid: req.params.uuid },
    }).then(scenario => {
      res.send({ scenario })
    })
  })
}
