const Scenario = require('../schemas/Scenario').Scenario
const ScenarioOo = require('../schemas/Scenario').ScenarioOo
const ScenarioSentence = require('../schemas/Scenario').ScenarioSentence
const Oo = require('../schemas/Oo')
const Audio = require('../schemas/Audio')
const { Op } = require('sequelize')

module.exports = app => {
  app.post('/scenarios', (req, res) => {
    Scenario.findAll({
      // where: {
      //   '$oos.id$': {
      //     [Op.in]: req.body.oos,
      //   },
      // },
    }).then(scenarios => {
      res.send({ scenarios })
    })
  })
}
