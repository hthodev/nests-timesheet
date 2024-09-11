'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
        unique: true,
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      pmId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      allowedLeaveDay: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('INTERN', 'STAFF', 'COLLABORATOR', 'ADMIN'),
        allowNull: false,
      },
      level: {
        type: Sequelize.ENUM('INTERN', 'FRESHER', 'JUNIOR', 'SENIOR'),
        allowNull: false,
      },
      salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sex: {
        type: Sequelize.ENUM('MALE', 'FEMALE'),
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
      picture: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      birthday: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      position: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      remainLeave: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      bankName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bankAccount: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      taxCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      emergencyContactPhone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      insuranceStatus: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      identify: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dateOfIssue: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      issuedBy: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      placeOfOrigin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      placeOfResidence: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      currentAddress: {
        type: Sequelize.STRING,
        allowNull: true,
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
