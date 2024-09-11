'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        id: '39228169-e68b-4440-9933-ba7ffd58de44',
        firstName: 'Admin',
        lastName: 'Company',
        email: 'thienthotran.it@gmail.com',
        phoneNumber: '0121112223',
        userName: 'admin.company',
        pmId: null,
        allowedLeaveDay: 0,
        type: 'STAFF',
        level: 'SENIOR',
        salary: 0,
        sex: 'MALE',
        isActive: true,
        branchId: '6ac9bc11-5329-4845-a9ef-ac290020ceed',
        isOfficeManager: false,
        picture: null,
        birthday: new Date('01-01-2001'),
        position: 'ADMIN',
        bankName: 'Bank of Example', 
        bankAccount: '00000000000',
        taxCode: null,
        emergencyContactPhone: null,
        insuranceStatus: null,
        identify: '200200200',
        dateOfIssue: '2020-01-01',
        issuedBy: 'Viet Nam',
        placeOfOrigin: 'Hometown',
        placeOfResidence: 'Current City',
        currentAddress: '123 Example Street',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', {
      id: '39228169-e68b-4440-9933-ba7ffd58de44',
    });
  },
};
