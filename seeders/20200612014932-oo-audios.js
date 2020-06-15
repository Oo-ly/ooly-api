'use strict'

const { v4: uuidv4 } = require('uuid')
const oos = require('./oos/oos')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const audios = []

    oos.forEach(oo => {
      oo.entries.forEach(audio => {
        audios.push({
          uuid: uuidv4(),
          name: audio,
          type: 'entry',
          url: `oos/entries/${audio}`,
          interaction: false,
          order: 0,
          audibleType: 'oo',
          audibleUuid: oo.uuid,
          ooUuid: oo.uuid,
        })
      })

      oo.exits.forEach(audio => {
        audios.push({
          uuid: uuidv4(),
          name: audio,
          type: 'exit',
          url: `oos/exits/${audio}`,
          interaction: false,
          order: 0,
          audibleType: 'oo',
          audibleUuid: oo.uuid,
          ooUuid: oo.uuid,
        })
      })

      oo.byes.forEach(audio => {
        audios.push({
          uuid: uuidv4(),
          name: audio,
          type: 'bye',
          url: `oos/byes/${audio}`,
          interaction: false,
          order: 0,
          audibleType: 'oo',
          audibleUuid: oo.uuid,
          ooUuid: oo.uuid,
        })
      })

      oo.hellos.forEach(audio => {
        audios.push({
          uuid: uuidv4(),
          name: audio,
          type: 'hello',
          url: `oos/hellos/${audio}`,
          interaction: false,
          order: 0,
          audibleType: 'oo',
          audibleUuid: oo.uuid,
          ooUuid: oo.uuid,
        })
      })

      oo.noScenario.forEach(audio => {
        audios.push({
          uuid: uuidv4(),
          name: audio,
          type: 'no-scenario',
          url: `oos/no-scenario/${audio}`,
          interaction: false,
          order: 0,
          audibleType: 'oo',
          audibleUuid: oo.uuid,
          ooUuid: oo.uuid,
        })
      })
    })

    return queryInterface.bulkInsert('audios', audios, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('audios', null, {})
  },
}
