const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const Oo = sequelize.define(
  'oos',
  {
    uuid: {
      type: Sequelize.UUIDV4,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    color: Sequelize.STRING,
    objectName: Sequelize.STRING,
    toreObjectName: Sequelize.STRING,
    isAvailable: Sequelize.BOOLEAN,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    defaultScope: {
      attributes: [
        'uuid',
        'name',
        'description',
        'color',
        'objectName',
        'toreObjectName',
      ],
      where: {
        isAvailable: true,
      },
      order: [['createdAt', 'ASC']],
    },
  },
)

module.exports = Oo
