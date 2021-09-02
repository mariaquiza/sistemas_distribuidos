// Importación de la liberia Express
const  express = require('express');
// invocar el metodo de router
const router = express.Router();
const { body } = require('express-validator');
const equipoController = require('../controllers/equipoController');
const jugadorController = require('../controllers/jugadorController');

module.exports = function(){
    router.get('/', equipoController.FedssportHome);
        return router;
}

