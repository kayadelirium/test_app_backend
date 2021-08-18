'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn("Nodes", "parentId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Nodes",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    })
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn("Nodes", "parentId")
  }
};
