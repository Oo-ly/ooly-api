const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const Oo = require('./Oo')
const User = require('./User')

const Feedback = sequelize.define(
  'feedbacks',
  {
    uuid: {
      type: Sequelize.UUIDV4,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    userUuid: {
      type: Sequelize.UUIDV4,
      references: {
        model: User,
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
      attributes: ['uuid', 'status', 'createdAt'],
      include: [{ model: Oo }],
    },
  },
)

const FeedbackOo = sequelize.define(
  'feedback_oos',
  {
    uuid: {
      type: Sequelize.UUIDV4,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    feedbackUuid: {
      type: Sequelize.UUIDV4,
      references: {
        model: Feedback,
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
  },
  {
    timestamps: false,
  },
)

module.exports = {
  Feedback,
  FeedbackOo,
}
