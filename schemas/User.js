const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const Oo = require('./Oo')

const User = sequelize.define('users', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

const UserOo = sequelize.define('user_oos', {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
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
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

Oo.belongsToMany(User, { through: UserOo })
User.belongsToMany(Oo, { through: UserOo })

module.exports = User
