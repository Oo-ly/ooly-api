const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const Oo = require('../schemas/Oo')
const Sentence = require('../schemas/Scenario').ScenarioSentence
const Scenario = require('../schemas/Scenario').Scenario

const Audio = sequelize.define('audio', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  hash: Sequelize.STRING,
  url: Sequelize.STRING,
  type: Sequelize.STRING,
  ooId: {
    type: Sequelize.INTEGER,
    references: {
      model: Oo,
      key: 'id',
    },
  },
  audibleId: Sequelize.INTEGER,
  audibleType: Sequelize.STRING,
})

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

Sentence.hasOne(Audio, {
  foreignKey: 'audibleId',
  constraints: false,
  scope: {
    audibleType: 'sentence',
  },
})
Audio.belongsTo(Sentence, { foreignKey: 'audibleId', constraints: false })

Scenario.hasMany(Audio, {
  foreignKey: 'audibleId',
  constraints: false,
  scope: {
    audibleType: 'scenario',
  },
})
Audio.belongsTo(Scenario, { foreignKey: 'audibleId', constraints: false })

module.exports = Audio
