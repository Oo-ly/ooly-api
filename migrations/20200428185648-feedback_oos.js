'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('feedback_oos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      feedbackId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'feedbacks',
          key: 'id',
          allowNull: false,
        },
      },
      ooId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'oos',
          key: 'id',
          allowNull: false,
        },
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('feedback_oos')
  },
}
