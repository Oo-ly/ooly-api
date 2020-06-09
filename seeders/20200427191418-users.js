'use strict'

const faker = require('faker')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')

const NB_USERS = 50

const users = [
  {
    uuid: uuidv4(),
    username: 'Ooly',
    email: 'ooly@ooly.fr',
    password: bcrypt.hashSync('ooly' + process.env.SECRET_SALT, 8),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

for (let i = 0; i < NB_USERS; i += 1) {
  const password = 'testtest' + process.env.SECRET_SALT
  const hash = bcrypt.hashSync(password, 8)
  users.push({
    uuid: uuidv4(),
    username: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password: hash,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', users, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  },
}
