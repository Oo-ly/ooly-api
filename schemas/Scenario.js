const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const Oo = require('./Oo')

const Scenario = sequelize.define('scenarios', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

const ScenarioOo = sequelize.define('scenario_oos', {
  scenarioId: {
    type: Sequelize.INTEGER,
    references: {
      model: Scenario,
      key: 'id',
    },
  },
  ooId: {
    type: Sequelize.INTEGER,
    references: {
      model: Oo,
      key: 'id',
    },
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

const ScenarioSentence = sequelize.define('scenario_sentences', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  hash: { type: Sequelize.STRING },
  audio: { type: Sequelize.BLOB('long') },
  scenarioId: {
    type: Sequelize.INTEGER,
    references: {
      model: Scenario,
      key: 'id',
    },
  },
  ooId: {
    type: Sequelize.INTEGER,
    references: {
      model: Oo,
      key: 'id',
    },
  },
  order: { type: Sequelize.INTEGER, allowNull: false },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

Scenario.belongsToMany(Oo, { through: ScenarioOo })
Oo.belongsToMany(Scenario, { through: ScenarioOo })
Scenario.hasMany(ScenarioSentence)
ScenarioSentence.belongsTo(Scenario)
ScenarioSentence.belongsTo(Oo)

module.exports = {
  Scenario,
  ScenarioOo,
  ScenarioSentence,
}
