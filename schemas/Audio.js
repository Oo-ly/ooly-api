const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const Oo = require('../schemas/Oo')

const fs = require('fs')
const path = require('path')

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
    encodedData: {
      type: Sequelize.VIRTUAL,
      get() {
        const filePath = path.resolve(
          __dirname,
          '..',
          'public',
          'voices',
          this.url,
        )
        const audio = fs.readFileSync(filePath)
        return audio.toString('base64')
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
