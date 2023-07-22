'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('aiMessageAttachments', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      aiMessageId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: 'aiMessages', key: 'id' }
      },
      name: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
      path: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    return queryInterface.dropTable('aiMessageAttachments')
  }
};
