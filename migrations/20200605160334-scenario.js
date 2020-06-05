'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('scenarios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })

    await queryInterface.createTable('scenario_oos', {
      scenarioId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'scenarios',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ooId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'oos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })

    return queryInterface.createTable('scenario_sentences', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      hash: {
        type: Sequelize.STRING,
      },
      audio: {
        type: Sequelize.BLOB('long'),
      },
      scenarioId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'scenarios',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ooId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'oos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
