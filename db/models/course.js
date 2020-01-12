const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Sequelize.Model {}
  Course.init({
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
          msg: 'Please provide a "Title"!'
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

  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      as: 'owner', // Alias
      foreignKey: {
          fieldName: 'userId',
          allowNull: false,
      },
    });
  };

  return Course;
};