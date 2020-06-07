'use strict'

const { v4: uuidv4 } = require('uuid')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('scenarios', [
      {
        uuid: uuidv4(),
        name: 'Musique tibétaine',
      },
      {
        uuid: uuidv4(),
        name: "Tisane à l'ortie",
      },
    ])

    // await queryInterface.bulkInsert('scenario_oos', [
    //   {
    //     scenarioId: 1,
    //     ooId: 1,
    //   },
    //   {
    //     scenarioId: 1,
    //     ooId: 2,
    //   },
    //   {
    //     scenarioId: 2,
    //     ooId: 2,
    //   },
    //   {
    //     scenarioId: 2,
    //     ooId: 3,
    //   },
    //   {
    //     scenarioId: 2,
    //     ooId: 4,
    //   },
    // ])

    // await queryInterface.bulkInsert('scenario_sentences', [
    //   {
    //     hash: 'a',
    //     scenarioId: 1,
    //   },
    //   {
    //     hash: 'b',
    //     scenarioId: 1,
    //     interaction: true,
    //   },
    // ])
    return new Promise(resolve => resolve())
    return queryInterface.bulkInsert('audios', [
      // {
      //   hash: 'abc',
      //   url: '/1.mp3',
      //   type: 'entry',
      //   audibleId: 1,
      //   audibleType: 'scenario',
      //   ooId: 1,
      // },
      // {
      //   hash: 'def',
      //   url: '/2.mp3',
      //   type: 'exit',
      //   audibleId: 1,
      //   audibleType: 'scenario',
      //   ooId: 2,
      // },
      // {
      //   hash: 'ghi',
      //   url: '/3.mp3',
      //   audibleId: 1,
      //   audibleType: 'oo',
      //   ooId: 1,
      // },
      // {
      //   hash: 'jkl',
      //   url: '/4.mp3',
      //   audibleId: 2,
      //   audibleType: 'oo',
      //   ooId: 2,
      // },
      // {
      //   hash: 'jkl',
      //   url: '/5.mp3',
      //   audibleId: 1,
      //   audibleType: 'sentence',
      //   ooId: 2,
      //   order: 0,
      // },
      // {
      //   hash: 'jkl',
      //   url: '/6.mp3',
      //   audibleId: 2,
      //   audibleType: 'sentence',
      //   ooId: 1,
      //   order: 1,
      // },
      // {
      //   hash: 'aezr',
      //   url: '/7.mp3',
      //   audibleId: 2,
      //   audibleType: 'sentence',
      //   ooId: 1,
      //   order: 1,
      //   type: 'dislike',
      // },
      // {
      //   hash: 'zraze',
      //   url: '/8.mp3',
      //   audibleId: 2,
      //   audibleType: 'sentence',
      //   ooId: 1,
      //   order: 2,
      //   type: 'dislike',
      // },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('scenarios', null, {})
  },
}
