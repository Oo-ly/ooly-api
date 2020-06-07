'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('scenarios', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })

    await queryInterface.createTable('scenario_oos', {
      scenarioUuid: {
        type: Sequelize.UUID,
        references: {
          model: 'scenarios',
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

    return queryInterface.createTable('scenario_sentences', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      hash: {
        type: Sequelize.STRING,
      },
      interaction: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      scenarioUuid: {
        type: Sequelize.UUID,
        references: {
          model: 'scenarios',
          key: 'uuid',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('scenario_sentences')
    await queryInterface.dropTable('scenario_oos')
    return queryInterface.dropTable('scenarios')
  },
}
