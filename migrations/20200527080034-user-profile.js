'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'lastname', {
        type: Sequelize.STRING,
        after: 'email',
      }),
      queryInterface.addColumn('users', 'firstname', {
        type: Sequelize.STRING,
        after: 'email',
      }),
      queryInterface.addColumn('users', 'surname', {
        type: Sequelize.STRING,
        after: 'email',
      }),
      queryInterface.addColumn('users', 'age', {
        type: Sequelize.INTEGER,
        after: 'email',
      }),
      queryInterface.addColumn('users', 'imei', {
        type: Sequelize.STRING,
        after: 'email',
      }),
      queryInterface.addColumn('users', 'sleepHour', {
        type: Sequelize.STRING,
        after: 'email',
      }),
      queryInterface.addColumn('users', 'activities', {
        type: Sequelize.TEXT,
        after: 'email',
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'lastname'),
      queryInterface.removeColumn('users', 'firstname'),
      queryInterface.removeColumn('users', 'surname'),
      queryInterface.removeColumn('users', 'age'),
      queryInterface.removeColumn('users', 'imei'),
      queryInterface.removeColumn('users', 'sleepHour'),
      queryInterface.removeColumn('users', 'activities'),
    ])
  },
}
