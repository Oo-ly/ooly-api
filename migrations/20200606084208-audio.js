'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('audios', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      interaction: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      order: {
        type: Sequelize.INTEGER,
        defaultValue: 99,
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
      audibleUuid: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      audibleType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
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
    return queryInterface.dropTable('audios')
  },
}
