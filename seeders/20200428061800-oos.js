'use strict'

const oos = require('./oos/oos')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise(async resolve => {
      const oosInfos = []

      oos.forEach(oo => {
        oosInfos.push({
          uuid: oo.uuid,
          name: oo.name,
          description: oo.description,
          color: oo.color,
          objectName: oo.objectName,
          toreObjectName: oo.toreObjectName,
          isAvailable: oo.isAvailable,
        })
      })

      oosInfos.forEach(async oo => {
        await queryInterface.bulkInsert('oos', [oo], {})
      })
      resolve()
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('oos', null, {})
  },
}
