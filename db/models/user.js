const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class User extends Sequelize.Model {}
    User.init({
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

    User.associate = (models) => {
        User.hasMany(models.Course, {
            as: 'owner', // Alias
            foreignKey: {
                fieldName: 'userId',
                allowNull: false,
            },
        });
    };

return User;
};