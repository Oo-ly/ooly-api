const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const Oo = require('./Oo')
const Audio = require('./Audio')
const User = require('./User')

const AudioSuggestion = sequelize.define(
  'suggestion_audios',
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
    suggestedAudioUuid: {
      type: Sequelize.UUID,
      references: {
        model: Audio,
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
      include: [{ model: Audio }],
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
AudioSuggestion.belongsTo(Audio, { foreignKey: 'suggestedAudioUuid' })

// Based on the sentences liked by the user, we can suggest new Oos to him (GER algorithm).
OoSuggestion.belongsTo(Oo, { foreignKey: 'suggestedOoUuid' })

module.exports = {
  AudioSuggestion,
  OoSuggestion,
}
