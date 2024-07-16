const db = require('./db');

//Set user Tables
const Users = db.sequelize.define('users', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true 
    },
    name: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    passwd: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
});

//Users.sync() --Cria o banco e deve ser usado só uma vez

module.exports = Users;