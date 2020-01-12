const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Users extends Sequelize.Model {}
    Users.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
              notEmpty: {
                args: true,
                msg: 'Please Provide a "First Name!"'
              },
              notNull: {
                args: true,
                msg: '"First Name" is Required!'
              }
            }
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
              notEmpty: {
                args: true,
                msg: 'Please Provide a "Last Name!"'
              },
              notNull: {
                args: true,
                msg: '"Last Name" is Required!'
              }
            }
        },
        emailAddress: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            defaultValue: '',
            validate: {
              notEmpty: {
                args: true,
                msg: 'Please Provide a "E-Mail"!'
              },
              notNull: {
                args: true,
                msg: '"E-Mail" is Required!'
              }
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
              notEmpty: {
                args: true,
                msg: 'Please Provide a "Password"!'
              },
              notNull: {
                args: true,
                msg: '"Password" is Required!'
              }
            }
        }, 
    }, { sequelize });

    Users.associate = (models) => {
        Users.hasMany(models.Courses, {
            as: 'owner', // Alias
            foreignKey: {
                fieldName: 'userId',
                allowNull: false,
            },
        });
    };

return Users;
};