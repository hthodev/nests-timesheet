const uuid = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      const users = await queryInterface.sequelize.query(
        `select id from users`, { type: 'SELECT' },
      );
      const workingTimes = []
      for (const user of users) {
        workingTimes.push({
            id: uuid.v4(),
            userId: user.id,
            morningStartAt: '8:00',
            morningEndAt: '12:00',
            morningWorking: 4,
            afternoonStartAt: '13:00',
            afternoonEndAt: '17:00',
            afternoonWorking: 4,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
      }
      return queryInterface.bulkInsert('workingTimes', workingTimes, { transaction });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((transaction) => {});
  },
};
