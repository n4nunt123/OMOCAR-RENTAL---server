'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.addColumn('Transportation', 'status', {
        allowNull: false,
        type: Sequelize.STRING
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.removeColumn('Transportation', 'status');
  }
};
