'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];

    for (let i = 1; i <= 20; i++) {
      users.push({
        name: `Demo User ${i}`,
        email: `user${i}@example.com`,
        isAdmin: i === 1, // Make the first user an admin, others are not
        password: `password${i}`, // Consider hashing passwords in a real application
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {}); // Deletes all users created by this seeder
  }
};
