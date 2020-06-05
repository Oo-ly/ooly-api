const Scenario = require('../schemas/Scenario').Scenario
const ScenarioOo = require('../schemas/Scenario').ScenarioOo
const Oo = require('../schemas/Oo')

module.exports = app => {
  app.post('/scenarios', (req, res) => {
    Scenario.findAll({
      include: [
        {
          model: Oo,
          attributes: [
            'id',
            'name',
            'description',
            'color',
            'objectName',
            'toreObjectName',
            'isAvailable',
          ],
          through: {
            attributes: [],
          },
        },
      ],
    }).then(scenarios => {
      res.send({ scenarios })
    })
  })
}
