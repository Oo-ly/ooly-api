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

Scenario.addScope('defaultScope', {
  attributes: ['uuid', 'name'],
  include: [
    { model: Oo, through: { attributes: [] } },
    { model: Audio, as: 'sentences' },
    { model: Audio, as: 'neutral_entries' },
    { model: Audio, as: 'positive_entries' },
    { model: Audio, as: 'negative_entries' },
    { model: Audio, as: 'exits' },
  ],
})

// A scenario is played by a group of Oos.
Scenario.belongsToMany(Oo, { through: ScenarioOo })
Oo.belongsToMany(Scenario, { through: ScenarioOo })

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
  as: 'sentences',
  scope: {
    audibleType: 'scenario',
    type: null,
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
}
