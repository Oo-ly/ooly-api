'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('feedback_oos', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      feedbackUuid: {
        type: Sequelize.UUID,
        references: {
          model: 'feedbacks',
          key: 'uuid',
          allowNull: false,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ooUuid: {
        type: Sequelize.UUID,
        references: {
          model: 'oos',
          key: 'uuid',
          allowNull: false,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('feedback_oos')
  },
}
