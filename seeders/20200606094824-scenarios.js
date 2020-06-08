'use strict'

const { v4: uuidv4 } = require('uuid')

const scenarioTest = require('./scenarios/test.scenario')

const scenariosJson = [scenarioTest]

const scenarios = []
const scenariosOos = []
const scenariosSentences = []
const audios = []

scenariosJson.forEach(scenario => {
  scenarios.push(scenario.scenario)
  scenariosOos.push(...scenario.oos)
  scenariosSentences.push(...scenario.sentences)
  audios.push(...scenario.audios)
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('scenarios', scenarios)
    await queryInterface.bulkInsert('scenario_oos', scenariosOos)
    await queryInterface.bulkInsert('scenario_sentences', scenariosSentences)
    return queryInterface.bulkInsert('audios', audios)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('audios', null, {})
    await queryInterface.bulkDelete('scenario_sentences', null, {})
    await queryInterface.bulkDelete('scenario_oos', null, {})
    return queryInterface.bulkDelete('scenarios', null, {})
  },
}
