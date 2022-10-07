'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn("Transportation", "AuthorId", "authorId")
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn("Transportation", "authorId", "AuthorId")
  }
};
