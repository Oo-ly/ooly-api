const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const Audio = require('./Audio')
const Oo = require('./Oo')

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
    audioUuid: {
      type: Sequelize.UUID,
      references: {
        model: 'audios',
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
      include: [
        {
          model: Audio,
          attributes: ['uuid'],
          as: 'audio',
          include: [Oo],
          required: true,
          where: {
            type: null,
          },
        },
      ],
      order: [['createdAt', 'ASC']],
    },
  },
)

// The feedback is in response of an interaction of a sentence. A same sentence can have multiple feedbacks from multiple users.
Feedback.belongsTo(Audio, { foreignKey: 'audioUuid', as: 'audio' })

module.exports = Feedback
