const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'fsjstd-restapi.db',
  logging: false
});

const db = {
  sequelize,
  Sequelize,
  models: {},
};

db.models.Courses = require('./models/course.js')(sequelize);
db.models.Users = require('./models/user.js')(sequelize);

module.exports = db;