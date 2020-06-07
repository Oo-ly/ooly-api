'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('audios', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      hash: {
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
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('audios')
  },
}
