const Sequelize = require('sequelize')
const Op = Sequelize.Op
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
    type: Sequelize.UUID,
    references: {
      model: Scenario,
      key: 'uuid',
    },
  },
  ooUuid: {
    type: Sequelize.UUID,
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
    name: { type: Sequelize.STRING },
    interaction: { type: Sequelize.BOOLEAN },
    order: Sequelize.INTEGER,
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
      attributes: ['uuid', 'name', 'interaction', 'order'],
      include: [{ model: Audio }, { model: Audio, as: 'dislikes' }, { model: Audio, as: 'likes' }],
    },
  },
)

Scenario.addScope('defaultScope', {
  attributes: ['uuid', 'name'],
  include: [
    { model: Oo, through: { attributes: [] } },
    { model: ScenarioSentence, as: 'sentences' },
    { model: Audio, as: 'neutral_entries' },
    { model: Audio, as: 'positive_entries' },
    { model: Audio, as: 'negative_entries' },
    { model: Audio, as: 'exits' },
  ],
})

// A scenario is played by a group of Oos.
Scenario.belongsToMany(Oo, { through: ScenarioOo })
Oo.belongsToMany(Scenario, { through: ScenarioOo })

// A scenario is composed of multiple sentences (it owns them)
Scenario.hasMany(ScenarioSentence, { as: 'sentences' })
ScenarioSentence.belongsTo(Scenario)

// An Oo have several audios, such as 'Hello' or 'Good bye'
Oo.hasMany(Audio, {
  foreignKey: 'audibleUuid',
  constraints: false,
  scope: {
    audibleType: 'oo',
  },
})
Audio.belongsTo(Oo, { foreignKey: 'audibleUuid', constraints: false })

// A audio is pronounced by a specific Oo.
Oo.hasMany(Audio, { foreignKey: 'ooId' })
Audio.belongsTo(Oo)

// A sentence has an audio, which will be pronounced by an Oo
ScenarioSentence.hasOne(Audio, {
  foreignKey: 'audibleUuid',
  constraints: false,
  scope: {
    audibleType: 'sentence',
    type: null,
  },
})
Audio.belongsTo(ScenarioSentence, {
  foreignKey: 'audibleUuid',
  constraints: false,
})

// In the case of a sentence with an interaction, a sentence can have 'dislike_sentences',
// that are sentences pronounced before ending the scenario
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

// A scenario begins with several audios, some positives, neutrals or negatives
// depending of the previous scenario (if any)
Scenario.hasMany(Audio, {
  foreignKey: 'audibleUuid',
  constraints: false,
  as: 'positive_entries',
  scope: {
    audibleType: 'scenario',
    type: 'entry:positive',
  },
})

Scenario.hasMany(Audio, {
  foreignKey: 'audibleUuid',
  constraints: false,
  as: 'negative_entries',
  scope: {
    audibleType: 'scenario',
    type: 'entry:negative',
  },
})

Scenario.hasMany(Audio, {
  foreignKey: 'audibleUuid',
  constraints: false,
  as: 'neutral_entries',
  scope: {
    audibleType: 'scenario',
    type: 'entry', // neutral entry
  },
})

// A scenario has some 'exits' audios, when the scenario is finished
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
