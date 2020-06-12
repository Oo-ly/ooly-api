const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const Oo = require('../schemas/Oo')

const fs = require('fs')
const path = require('path')

const Audio = sequelize.define('audios', {
  uuid: {
    type: Sequelize.UUIDV4,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  url: Sequelize.STRING,
  type: Sequelize.STRING,
  order: Sequelize.INTEGER,
  interaction: Sequelize.BOOLEAN,
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
      const filePath = path.resolve(__dirname, '..', 'public', 'voices', this.url)

      if (fs.existsSync(filePath)) return fs.readFileSync(filePath).toString('base64')

      /* istanbul ignore next */
      return null
    },
  },
  audibleUuid: Sequelize.UUIDV4,
  audibleType: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

Audio.addScope('defaultScope', {
  attributes: ['uuid', 'name', 'url', 'type', 'order', 'interaction'],
  include: [
    Oo,
    {
      model: Audio.scope(null),
      as: 'dislikes',
      include: [Oo],
    },
  ],
})

// An Oo have several audios, such as 'Hello' or 'Good bye'
Oo.hasMany(Audio, {
  foreignKey: 'audibleUuid',
  constraints: false,
  scope: {
    audibleType: 'oo',
    type: null,
  },
})

Oo.hasMany(Audio, {
  foreignKey: 'audibleUuid',
  constraints: false,
  as: 'exits',
  scope: {
    audibleType: 'oo',
    type: 'exit',
  },
})

Oo.hasMany(Audio, {
  foreignKey: 'audibleUuid',
  constraints: false,
  as: 'hellos',
  scope: {
    audibleType: 'oo',
    type: 'hello',
  },
})

Oo.hasMany(Audio, {
  foreignKey: 'audibleUuid',
  constraints: false,
  as: 'byes',
  scope: {
    audibleType: 'oo',
    type: 'bye',
  },
})

Oo.hasMany(Audio, {
  foreignKey: 'audibleUuid',
  constraints: false,
  as: 'entries',
  scope: {
    audibleType: 'oo',
    type: 'entry',
  },
})

Audio.belongsTo(Oo, { foreignKey: 'audibleUuid', constraints: false })

// A audio is pronounced by a specific Oo.
Oo.hasMany(Audio, { foreignKey: 'ooUuid' })
Audio.belongsTo(Oo)

Audio.hasMany(Audio, {
  foreignKey: 'audibleUuid',
  constraints: false,
  as: 'dislikes',
  scope: {
    audibleType: 'audio',
  },
})

Oo.addScope('withAudio', {
  attributes: ['uuid', 'name', 'description', 'color', 'objectName', 'toreObjectName', 'createdAt'],
  where: {
    isAvailable: true,
  },
  order: [['createdAt', 'ASC']],
  include: [
    { model: Audio.scope(null), as: 'byes', include: [] },
    { model: Audio.scope(null), as: 'hellos', include: [] },
    { model: Audio.scope(null), as: 'entries', include: [] },
    { model: Audio.scope(null), as: 'exits', include: [] },
  ],
})

module.exports = Audio
