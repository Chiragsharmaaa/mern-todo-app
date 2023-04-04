const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('todo-mern-app', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: process.env.DB_HOST
})

module.exports = sequelize;