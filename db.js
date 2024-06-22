const Sequelize = require('sequelize');
const sequelize = new Sequelize('mydb', 'lucas', 'postgres', {
    dialect: "postgres",
    host: "localhost",
    port: 5432
});

module.exports = sequelize;