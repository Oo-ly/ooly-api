'use strict'

const { v4: uuidv4 } = require('uuid')

const scenarioTest = require('./scenarios/test.scenario')
const scenarioDocu = require('./scenarios/docu.scenario')
const scenarioTisane = require('./scenarios/tisane.scenario')
const scenarioPlante = require('./scenarios/plante.scenario')

const scenariosJson = [scenarioTest, scenarioDocu, scenarioTisane, scenarioPlante]

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
