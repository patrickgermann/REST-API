const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Users extends Sequelize.Model {}
    Users.init({
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        emailAddress: Sequelize.STRING,
        password: Sequelize.STRING
    }, { sequelize });
return Users;
};