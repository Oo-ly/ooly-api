const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const Oo = require('./Oo')
const Audio = require('./Audio')

const Scenario = sequelize.define('scenarios', {
  uuid: {
    type: Sequelize.UUIDV4,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

const ScenarioOo = sequelize.define('scenario_oos', {
  scenarioUuid: {
    type: Sequelize.UUIDV4,
    references: {
      model: Scenario,
      key: 'uuid',
    },
  },
  ooUuid: {
    type: Sequelize.UUIDV4,
    references: {
      model: Oo,
      key: 'uuid',
    },
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

const ScenarioSentence = sequelize.define(
  'scenario_sentences',
  {
    uuid: {
      type: Sequelize.UUIDV4,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    hash: { type: Sequelize.STRING },
    interaction: { type: Sequelize.BOOLEAN },
    scenarioUuid: {
      type: Sequelize.UUIDV4,
      references: {
        model: Scenario,
        key: 'uuid',
      },
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    defaultScope: {
      attributes: ['uuid', 'hash', 'interaction'],
      include: [
        { model: Audio },
        { model: Audio, as: 'dislikes' },
        { model: Audio, as: 'likes' },
      ],
    },
  },
)

Scenario.addScope('defaultScope', {
  attributes: ['uuid', 'name'],
  include: [
    { model: Oo, through: { attributes: [] } },
    { model: ScenarioSentence, as: 'sentences' },
    { model: Audio, as: 'entries' },
    { model: Audio, as: 'exits' },
  ],
})

Scenario.belongsToMany(Oo, { through: ScenarioOo })
Oo.belongsToMany(Scenario, { through: ScenarioOo })
Scenario.hasMany(ScenarioSentence, { as: 'sentences' })
ScenarioSentence.belongsTo(Scenario)

Oo.hasMany(Audio, {
  foreignKey: 'audibleUuid',
  constraints: false,
  scope: {
    audibleType: 'oo',
  },
})
Audio.belongsTo(Oo, { foreignKey: 'audibleUuid', constraints: false })

Oo.hasMany(Audio, { foreignKey: 'ooId' })
Audio.belongsTo(Oo)

ScenarioSentence.hasOne(Audio, {
  foreignKey: 'audibleUuid',
  constraints: false,
  scope: {
    audibleType: 'sentence',
    type: null,
  },
})

ScenarioSentence.hasMany(Audio, {
  foreignKey: 'audibleUuid',
  constraints: false,
  as: 'dislikes',
  scope: {
    audibleType: 'sentence',
    type: 'dislike',
  },
})

ScenarioSentence.hasMany(Audio, {
  foreignKey: 'audibleUuid',
  constraints: false,
  as: 'likes',
  scope: {
    audibleType: 'sentence',
    type: 'like',
  },
})
Audio.belongsTo(ScenarioSentence, {
  foreignKey: 'audibleUuid',
  constraints: false,
})

Scenario.hasMany(Audio, {
  foreignKey: 'audibleUuid',
  constraints: false,
  as: 'entries',
  scope: {
    audibleType: 'scenario',
    type: 'entry',
  },
})

Scenario.hasMany(Audio, {
  foreignKey: 'audibleUuid',
  constraints: false,
  as: 'exits',
  scope: {
    audibleType: 'scenario',
    type: 'exit',
  },
})

Audio.belongsTo(Scenario, { foreignKey: 'audibleUuid', constraints: false })

module.exports = {
  Scenario,
  ScenarioOo,
  ScenarioSentence,
}
