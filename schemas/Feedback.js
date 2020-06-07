const Sequelize = require('sequelize')
const sequelize = require('../config/database')

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
          model: Oo,
          as: 'feedOos',
          through: { attributes: [], include: [] },
        },
      ],
      order: [
        ['createdAt', 'ASC'],
        ['feedOos', 'createdAt', 'ASC'],
      ],
    },
  },
)

const FeedbackOo = sequelize.define(
  'feedback_oos',
  {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    feedbackUuid: {
      type: Sequelize.UUID,
      references: {
        model: Feedback,
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
  },
  {
    timestamps: false,
  },
)

Feedback.belongsToMany(Oo, { through: FeedbackOo, as: 'feedOos' })

module.exports = {
  Feedback,
  FeedbackOo,
}
