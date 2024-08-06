'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable('users', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true, // Ensure email is unique
        },
        userName: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        allowedLeaveDay: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        type: {
          type: Sequelize.ENUM("INTERN", "STAFF", "COLLABORATOR"),
          allowNull: false,
        },
        level: {
          type: Sequelize.ENUM("INTERN", "FRESHER", "JUNIOR", "SENIOR"),
          allowNull: false,
        },
        salary: {
          type: Sequelize.NUMERIC,
          allowNull: false,
        },
        sex: {
          type: Sequelize.ENUM("MALE", "FEMALE"),
          allowNull: false,
        },
        isActive: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        branchId: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      }, { transaction });
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('users', { transaction });
    });
  }
};
