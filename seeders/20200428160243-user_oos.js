'use strict'

const User = require('../schemas/User')
const Oo = require('../schemas/Oo')

const userOos = []

const createUserOo = async () => {
  const users = await User.findAll()
  const oos = await Oo.findAll()

  users.forEach(user => {
    const currentOos = []
    const numberOfOos = Math.ceil(Math.random() * oos.length)

    while (currentOos.length < numberOfOos) {
      const index = Math.floor(Math.random() * oos.length)
      const o = oos[index].uuid

      if (currentOos.indexOf(o) === -1) {
        currentOos.push(o)
      }
    }

    currentOos.forEach(oo => {
      userOos.push({
        userUuid: user.uuid,
        ooUuid: oo,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    })
  })
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await createUserOo()
    return queryInterface.bulkInsert('user_oos', userOos, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_oos', null, {})
  },
}
