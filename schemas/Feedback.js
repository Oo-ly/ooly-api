const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const Oo = require('./Oo')
const User = require('./User')

const Feedback = sequelize.define('feedbacks', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
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
})

const FeedbackOo = sequelize.define(
  'feedback_oos',
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    feedbackId: {
      type: Sequelize.INTEGER,
      references: {
        model: Feedback,
        key: 'id',
      },
    },
    ooId: {
      type: Sequelize.INTEGER,
      references: {
        model: Oo,
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
  },
)

Feedback.belongsToMany(Oo, { through: FeedbackOo })
Oo.belongsToMany(Feedback, { through: FeedbackOo })
User.hasMany(Feedback)
Feedback.belongsTo(User)

module.exports = {
  Feedback,
  FeedbackOo,
}
