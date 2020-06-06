const Scenario = require('../schemas/Scenario').Scenario
const ScenarioOo = require('../schemas/Scenario').ScenarioOo
const ScenarioSentence = require('../schemas/Scenario').ScenarioSentence
const Oo = require('../schemas/Oo')
const Audio = require('../schemas/Audio')
const { Op } = require('sequelize')

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
        {
          model: ScenarioSentence,
          as: 'sentences',
          attributes: ['hash', 'interaction', 'order'],
          include: [
            {
              model: Audio,
              attributes: ['hash', 'url'],
              include: [
                {
                  model: Oo,
                },
              ],
            },
          ],
        },
        {
          model: Audio,
          attributes: ['hash', 'url', 'type'],
        },
      ],
      // where: {
      //   '$ScenarioOo$.ooId': {
      //     [Op.in]: req.body.oos,
      //   },
      // },
    }).then(scenarios => {
      const result = scenarios.map(scenario => {
        const entries = []
        const exits = []

        scenario.audios.forEach(audio => {
          switch (audio.type) {
            case 'entry':
              entries.push(audio)
              break
            case 'exit':
              exits.push(audio)
              break
          }
        })

        scenario.entries = entries
        scenario.exits = exits

        scenario.setDataValue('entries', entries)
        scenario.setDataValue('exits', exits)

        delete scenario.audios

        return scenario
      })

      res.send({ scenarios: result })
    })
  })
}
