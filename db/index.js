const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'fsjstd-restapi.db'
});

const models = {};

console.log('Testing the connection to the database...');

(async () => {
  try {
    // Test the connection to the database
    console.log('Connection to the database successful!');
    await sequelize.authenticate();

    // Sync the models
    console.log('Synchronizing the models with the database...');
    await sequelize.sync();

    // Import all of the models.
    fs
        .readdirSync(path.join(__dirname, 'models'))
        .forEach((file) => {
        console.info(`Importing database model from file: ${file}`);
        const model = sequelize.import(path.join(__dirname, 'models', file));
        models[model.name] = model;
    });

        // If available, call method to create associations.
        Object.keys(models).forEach((modelName) => {
        if (models[modelName].associate) {
        console.info(`Configuring the associations for the ${modelName} model...`);
        models[modelName].associate(models);
        }
    });
  } catch(error) {
    console.log('Sorry there was a problem connecting')
  }
})();


module.exports = {
  sequelize,
  Sequelize,
  models,
};