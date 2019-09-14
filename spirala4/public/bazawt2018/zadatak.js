const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Zadatak = sequelize.define("zadatak",{
        naziv:Sequelize.STRING,
        postavka:Sequelize.STRING
    })
    return Zadatak;
};