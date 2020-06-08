const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const Oo = require('../schemas/Oo')

const Audio = sequelize.define(
  'audios',
  {
    uuid: {
      type: Sequelize.UUIDV4,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    url: Sequelize.STRING,
    type: Sequelize.STRING,
    ooUuid: {
      type: Sequelize.UUIDV4,
      references: {
        model: Oo,
        key: 'uuid',
      },
    },
    audibleUuid: Sequelize.UUIDV4,
    audibleType: Sequelize.STRING,
  },
  {
    defaultScope: {
      attributes: ['uuid', 'name', 'url', 'type'],
      include: Oo,
    },
  },
)

module.exports = Audio
