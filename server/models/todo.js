const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Todo = sequelize.define('todo', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    priority: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    duedate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    finisheddate: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    done: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    },
    starred: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    },

});

module.exports = Todo;