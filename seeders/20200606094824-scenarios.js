'use strict'

const { v4: uuidv4 } = require('uuid')

// const scenarioTest = require('./scenarios/test.scenario')
const scenarioBatman = require('./scenarios/batman.scenario')
const scenarioClooney = require('./scenarios/clooney.scenario')
const scenarioDocu = require('./scenarios/docu.scenario')
const scenarioPepito = require('./scenarios/pepito.scenario')
const scenarioPlante = require('./scenarios/plante.scenario')
const scenarioSeigneur = require('./scenarios/seigneur.scenario')
const scenarioSituation = require('./scenarios/situation.scenario')
const scenarioSpeed = require('./scenarios/speed.scenario')
const scenarioTisane = require('./scenarios/tisane.scenario')
const scenarioTractopelle = require('./scenarios/tractopelle.scenario')

const scenariosJson = [
  scenarioBatman,
  scenarioClooney,
  scenarioDocu,
  scenarioPepito,
  scenarioPlante,
  scenarioSeigneur,
  scenarioSituation,
  scenarioSpeed,
  scenarioTisane,
  scenarioTractopelle,
]

const scenarios = []
const scenariosOos = []
const audios = []

scenariosJson.forEach(scenario => {
  scenarios.push(scenario.scenario)
  scenariosOos.push(...scenario.oos)
  audios.push(...scenario.audios)
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('scenarios', scenarios)
    await queryInterface.bulkInsert('scenario_oos', scenariosOos)
    return queryInterface.bulkInsert('audios', audios)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('audios', null, {})
    await queryInterface.bulkDelete('scenario_oos', null, {})
    return queryInterface.bulkDelete('scenarios', null, {})
  },
}
