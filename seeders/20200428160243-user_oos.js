'use strict'

const NB_USERS = 50

const userOos = []

for (let i = 1; i <= NB_USERS; i += 1) {
  const oos = []
  const numberOfOos = Math.ceil(Math.random() * 7)

  while (oos.length < numberOfOos) {
    const id = Math.ceil(Math.random() * 7)

    if (oos.indexOf(id) === -1) {
      oos.push(id)
    }
  }

  oos.forEach(oo => {
    userOos.push({
      userId: i,
      ooId: oo,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_oos', userOos, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_oos', null, {})
  },
}
