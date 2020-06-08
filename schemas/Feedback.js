const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const Sentence = require('./Scenario').ScenarioSentence

const Feedback = sequelize.define(
  'feedbacks',
  {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    userUuid: {
      type: Sequelize.UUID,
      references: {
        model: 'users',
        key: 'uuid',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    sentenceUuid: {
      type: Sequelize.UUID,
      references: {
        model: 'scenario_sentences',
        key: 'uuid',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    defaultScope: {
      attributes: ['uuid', 'userUuid', 'status', 'createdAt'],
      order: [['createdAt', 'ASC']],
    },
  },
)

Feedback.belongsTo(Sentence)

module.exports = Feedback
