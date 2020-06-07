'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_oos', {
      userUuid: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'uuid',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ooUuid: {
        type: Sequelize.UUID,
        references: {
          model: 'oos',
          key: 'uuid',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_oos')
  },
}
