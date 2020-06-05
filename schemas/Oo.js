const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const Oo = sequelize.define('oos', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  color: Sequelize.STRING,
  objectName: Sequelize.STRING,
  toreObjectName: Sequelize.STRING,
  isAvailable: Sequelize.BOOLEAN,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

module.exports = Oo
