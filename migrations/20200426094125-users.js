'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: Sequelize.STRING,
      createdAt: {
        type: Sequelize.DATE(6),
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE(6),
        defaultValue: Sequelize.fn('NOW'),
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  },
}
