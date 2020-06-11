const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const Oo = require('./Oo')
const Sentence = require('./Scenario').ScenarioSentence
const User = require('./User')

const SentenceSuggestion = sequelize.define(
  'suggestion_sentences',
  {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    userUuid: {
      type: Sequelize.UUID,
      references: {
        model: User,
        key: 'uuid',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    suggestedSentenceUuid: {
      type: Sequelize.UUID,
      references: {
        model: Sentence,
        key: 'uuid',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    weight: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    defaultScope: {
      attributes: ['uuid', 'userUuid', 'weight', 'updatedAt'],
      order: [['weight', 'DESC']],
      include: [{ model: Sentence }],
    },
  },
)

const OoSuggestion = sequelize.define('suggestion_oos', {
  uuid: {
    type: Sequelize.UUIDV4,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  userUuid: {
    type: Sequelize.UUID,
    references: {
      model: User,
      key: 'uuid',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  suggestedOoUuid: {
    type: Sequelize.UUIDV4,
    references: {
      model: Oo,
      key: 'uuid',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  weight: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

// We recommand sentences (and so scenarios) based on the previous feedbacks of an user.
SentenceSuggestion.belongsTo(Sentence, { foreignKey: 'suggestedSentenceUuid' })

// Based on the sentences liked by the user, we can suggest new Oos to him (GER algorithm).
OoSuggestion.belongsTo(Oo, { foreignKey: 'suggestedOoUuid' })

module.exports = {
  SentenceSuggestion,
  OoSuggestion,
}
