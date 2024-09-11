'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('branches', [
      {
        id: '8de025bc-8254-4acf-ab54-124c936e8559',
        name: 'Ha Noi',
        morningStartAt: '08:00',
        morningEndAt: '12:00',
        morningWorking: 4,
        afternoonStartAt: '13:00',
        afternoonEndAt: '17:00',
        afternoonWorking: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '6ac9bc11-5329-4845-a9ef-ac290020ceed',
        name: 'Da Nang',
        morningStartAt: '08:00',
        morningEndAt: '12:00',
        morningWorking: 4,
        afternoonStartAt: '13:00',
        afternoonEndAt: '17:00',
        afternoonWorking: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2f388273-8b6a-4018-8c78-125d346f0a22',
        name: 'Ho Chi Minh',
        morningStartAt: '08:00',
        morningEndAt: '12:00',
        morningWorking: 4,
        afternoonStartAt: '13:00',
        afternoonEndAt: '17:00',
        afternoonWorking: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
  }
};
