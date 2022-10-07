'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require('../data/users.json').map(el => {
      const salt = bcrypt.genSaltSync(5)
      const hash = bcrypt.hashSync(el.password,salt)
      el.password = hash
      return {
        ...el,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    
   await queryInterface.bulkInsert('Users', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
