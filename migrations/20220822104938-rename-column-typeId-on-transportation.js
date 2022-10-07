'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn("Transportation", "TypeId", "typeId")
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn("Transportation", "typeId", "TypeId")
  }
};
