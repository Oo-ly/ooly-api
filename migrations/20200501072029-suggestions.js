'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('oo_suggestions', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
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
      suggestedOoUuid: {
        type: Sequelize.UUID,
        references: {
          model: 'oos',
          key: 'uuid',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      weight: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })

    return queryInterface.createTable('user_suggestions', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      userUuid: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'uuid',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      suggestedOoUuid: {
        type: Sequelize.UUID,
        references: {
          model: 'oos',
          key: 'uuid',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      weight: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('oo_suggestions')
    return queryInterface.dropTable('user_suggestions')
  },
}
