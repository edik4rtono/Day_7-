'use strict';

const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {

    const users = []

    for (let i = 1; i <= 120000 - 1; i++) {
      users.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: 'secret',
        created_at: new Date,
        updated_at: new Date,
      })
    }

    return queryInterface.bulkInsert('users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
