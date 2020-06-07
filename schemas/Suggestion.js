const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const Oo = require('./Oo')
const User = require('./User')

const UserSuggestion = sequelize.define(
  'user_suggestions',
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
    suggestedOoUuid: {
      type: Sequelize.UUID,
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
  },
  {
    defaultScope: {
      attributes: ['uuid', 'userUuid', 'weight', 'updatedAt'],
      order: [['weight', 'DESC']],
      include: [{ model: Oo }],
    },
  },
)

const OoSuggestion = sequelize.define('oo_suggestions', {
  uuid: {
    type: Sequelize.UUIDV4,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  ooUuid: {
    type: Sequelize.UUIDV4,
    references: {
      model: Oo,
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

UserSuggestion.belongsTo(Oo, { foreignKey: 'suggestedOoId' })
// Oo.hasMany(UserSuggestion)

module.exports = {
  UserSuggestion,
  OoSuggestion,
}
