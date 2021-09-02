const sequelize = require('sequelize');
const db = require('../config/db');
const slug = require('slug');
const shortid = require('shortid');

const Equipo = db.define('equipos',{

    id:{
        type:sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type:sequelize.STRING(90),
        allowNull:false
    },
    tipotorneo:{
        type:sequelize.STRING(100),
        allowNull:false
    },
    tipoequipo:{
        type: sequelize.STRING(100),
        allowNull:false
    },
    url:sequelize.STRING
},{
    hooks:{
        beforeCreate(equipos){
             const url = slug(equipos.nombre).toLowerCase();
             equipos.url = `${url}-${shortid.generate()}`;
        }
    } 
 });

module.exports = Equipo;