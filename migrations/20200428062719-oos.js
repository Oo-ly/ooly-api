'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('oos', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      objectName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      toreObjectName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isAvailable: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('oos')
  },
}
