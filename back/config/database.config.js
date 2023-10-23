const Sequelize = require('sequelize');
const { development: dbConfig } = require("./config.json");


const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: (msg) => console.log(`SEQUELIZE INFO : ${msg}`)
});

module.exports = sequelize;