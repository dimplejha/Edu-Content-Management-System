const sequelize = require('../config/db.config');
const User = require('./user.model');

const initDB = async () => {
  await sequelize.sync({ force: true });
};

module.exports = { User, initDB };
