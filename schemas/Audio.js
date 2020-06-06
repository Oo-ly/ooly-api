const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const Oo = require('../schemas/Oo')

const Audio = sequelize.define(
  'audios',
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    hash: Sequelize.STRING,
    url: Sequelize.STRING,
    type: Sequelize.STRING,
    order: Sequelize.INTEGER,
    ooId: {
      type: Sequelize.INTEGER,
      references: {
        model: Oo,
        key: 'id',
      },
    },
    audibleId: Sequelize.INTEGER,
    audibleType: Sequelize.STRING,
  },
  {
    defaultScope: {
      attributes: ['id', 'hash', 'url', 'type', 'order'],
      include: Oo,
    },
  },
)

module.exports = Audio
