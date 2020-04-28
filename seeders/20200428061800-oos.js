'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'oos',
      [
        {
          name: "Oo'la",
          description: 'Accueil',
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Gat'Oo",
          description: 'Bouffe',
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Herb'Oo",
          description: 'Plantes',
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dod'Oo",
          description: 'Sommeil',
          isAvailable: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Disc'Oo",
          description: 'Musique',
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Inf'Oo",
          description: 'News',
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Y'Oo'ga",
          description: 'Zen',
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('oos', null, {})
  },
}
