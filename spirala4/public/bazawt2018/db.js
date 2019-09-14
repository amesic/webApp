const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt2018","root","root",{host:"localhost",dialect:"mysql",logging:false});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//import modela
db.student = sequelize.import('../bazawt2018/student');
db.godina = sequelize.import('../bazawt2018/godina');
db.zadatak = sequelize.import('../bazawt2018/zadatak');
db.vjezba = sequelize.import('../bazawt2018/vjezba');

//veze
//student --vise na jedan --godina, fk studentGod, as studenti
db.godina.hasMany(db.student,{foreignKey:'studentGod', as:'studenti'});
//godina--vise na vise --vjezba, mt godina_vjezba, fk idgodina i idvjezba, as godine i vjezbe
db.vjezba.belongsToMany(db.godina,{as:'godine',through:'godina_vjezba',foreignKey:'idvjezba'});
db.godina.belongsToMany(db.vjezba,{as:'vjezbe',through:'godina_vjezba',foreignKey:'idgodina'});
//vjezba-- vise na vise-- zadatak, mt vjezba_zadatak, fk idvjezba i idzadatak, as vjezbe i zadaci
db.zadatak.belongsToMany(db.vjezba,{foreignKey:'idzadatak', as:'vjezbe',through:'vjezba_zadatak'});
db.vjezba.belongsToMany(db.zadatak,{foreignKey:'idvjezba', as:'zadaci',through:'vjezba_zadatak'});

module.exports=db;