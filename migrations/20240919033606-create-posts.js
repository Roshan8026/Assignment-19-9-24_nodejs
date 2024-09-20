'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: { // Foreign key reference to Users table
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Reference to Users table
          key: 'id'
        },
        onDelete: 'CASCADE', // If the user is deleted, delete their posts as well
        onUpdate: 'CASCADE'
      },
      heading: {
        type: Sequelize.STRING,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      filePath: {
        type: Sequelize.STRING,
        allowNull: true // Optional if users may not upload files
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Posts');
  }
};
