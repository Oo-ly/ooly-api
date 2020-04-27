'use strict'

const faker = require('faker')
const bcrypt = require('bcrypt')

const NB_USERS = 50

const users = []

for (let i = 0; i < NB_USERS; i += 1) {
  const password = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, 20)
  const hash = bcrypt.hashSync(password, 8)
  users.push({
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
