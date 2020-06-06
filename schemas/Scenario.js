const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const Oo = require('./Oo')
const Audio = require('./Audio')

const Scenario = sequelize.define(
  'scenarios',
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    defaultScope: {
      attributes: ['id', 'name'],
    },
  },
)

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

const ScenarioSentence = sequelize.define(
  'scenario_sentences',
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    hash: { type: Sequelize.STRING },
    interaction: { type: Sequelize.BOOLEAN },
    scenarioId: {
      type: Sequelize.INTEGER,
      references: {
        model: Scenario,
        key: 'id',
      },
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    defaultScope: {
      attributes: ['id', 'hash', 'interaction'],
      include: [
        { model: Audio },
        { model: Audio, as: 'dislikes' },
        { model: Audio, as: 'likes' },
      ],
    },
  },
)

Scenario.belongsToMany(Oo, { through: ScenarioOo })
Oo.belongsToMany(Scenario, { through: ScenarioOo })
Scenario.hasMany(ScenarioSentence, { as: 'sentences' })
ScenarioSentence.belongsTo(Scenario)

Oo.hasMany(Audio, {
  foreignKey: 'audibleId',
  constraints: false,
  scope: {
    audibleType: 'oo',
  },
})
Audio.belongsTo(Oo, { foreignKey: 'audibleId', constraints: false })

Oo.hasMany(Audio, { foreignKey: 'ooId' })
Audio.belongsTo(Oo)

ScenarioSentence.hasOne(Audio, {
  foreignKey: 'audibleId',
  constraints: false,
  scope: {
    audibleType: 'sentence',
    type: null,
  },
})

ScenarioSentence.hasMany(Audio, {
  foreignKey: 'audibleId',
  constraints: false,
  as: 'dislikes',
  scope: {
    audibleType: 'sentence',
    type: 'dislike',
  },
})

ScenarioSentence.hasMany(Audio, {
  foreignKey: 'audibleId',
  constraints: false,
  as: 'likes',
  scope: {
    audibleType: 'sentence',
    type: 'like',
  },
})
Audio.belongsTo(ScenarioSentence, {
  foreignKey: 'audibleId',
  constraints: false,
})

Scenario.hasMany(Audio, {
  foreignKey: 'audibleId',
  constraints: false,
  as: 'entries',
  scope: {
    audibleType: 'scenario',
    type: 'entry',
  },
})

Scenario.hasMany(Audio, {
  foreignKey: 'audibleId',
  constraints: false,
  as: 'exits',
  scope: {
    audibleType: 'scenario',
    type: 'exit',
  },
})

Audio.belongsTo(Scenario, { foreignKey: 'audibleId', constraints: false })

module.exports = {
  Scenario,
  ScenarioOo,
  ScenarioSentence,
}
