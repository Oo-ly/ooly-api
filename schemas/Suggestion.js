const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const Oo = require('./Oo')
const User = require('./User')

const UserSuggestion = sequelize.define('user_suggestions', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  suggestedOoId: {
    type: Sequelize.INTEGER,
    references: {
      model: Oo,
      key: 'id',
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

const OoSuggestion = sequelize.define('oo_suggestions', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  ooId: {
    type: Sequelize.INTEGER,
    references: {
      model: Oo,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  suggestedOoId: {
    type: Sequelize.INTEGER,
    references: {
      model: Oo,
      key: 'id',
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

UserSuggestion.belongsTo(Oo, { foreignKey: 'suggestedOoId' })
// Oo.hasMany(UserSuggestion)

module.exports = {
  UserSuggestion,
  OoSuggestion,
}
