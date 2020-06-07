const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const Oo = require('./Oo')
const Feedback = require('./Feedback').Feedback
const FeedbackOo = require('./Feedback').FeedbackOo

const User = sequelize.define('users', {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  lastname: Sequelize.STRING,
  firstname: Sequelize.STRING,
  surname: Sequelize.STRING,
  age: Sequelize.INTEGER,
  imei: Sequelize.STRING,
  sleepHour: Sequelize.STRING,
  activities: Sequelize.TEXT,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

const UserOo = sequelize.define('user_oos', {
  userUuid: {
    type: Sequelize.UUIDV4,
    references: {
      model: User,
      key: 'uuid',
    },
  },
  ooUuid: {
    type: Sequelize.UUIDV4,
    references: {
      model: Oo,
      key: 'uuid',
    },
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

User.addScope('defaultScope', {
  attributes: [
    'uuid',
    'username',
    'email',
    'lastname',
    'firstname',
    'surname',
    'age',
    'imei',
    'sleepHour',
    'activities',
    'createdAt',
  ],
  include: [
    {
      model: Oo,
      required: false,
      through: { attributes: [] },
      order: [['createdAt', 'ASC']],
    },
    { model: Feedback, required: false },
  ],
  order: [['createdAt', 'ASC']],
})

Oo.belongsToMany(User, { through: UserOo })
User.belongsToMany(Oo, { through: UserOo })

Feedback.belongsToMany(Oo, { through: FeedbackOo })
Oo.belongsToMany(Feedback, { through: FeedbackOo })

User.hasMany(Feedback)
Feedback.belongsTo(User)

module.exports = User
