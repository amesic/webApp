const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Vjezba = sequelize.define("vjezba",{
        naziv:{type: Sequelize.STRING, unique:true},
        spirala:Sequelize.BOOLEAN
    })
    return Vjezba;
};