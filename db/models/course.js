const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Courses extends Sequelize.Model {}
  Courses.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please Provide a "Title"!'
        },
        notNull: {
          args: true,
          msg: '"Title" is Required!'
        }
      }
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please provide a "Description"!'
        },
        notNull: {
          args: true,
          msg: '"Description" is Required!'
        }
      }
    },
    estimatedTime: {
        type: Sequelize.STRING,
        allowNull: true
    },
    materialsNeeded: {
        type: Sequelize.STRING,
        allowNull: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: -1,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please provide a "User"!'
        },
        notNull: {
          args: true,
          msg: '"User" is required!'
        }
      }
    }, 
  }, { sequelize });

  Courses.associate = (models) => {
    Courses.belongsTo(models.Users, {
      as: 'owner', // Alias
      foreignKey: {
          fieldName: 'userId',
          allowNull: false,
      },
    });
  };

  return Courses;
};