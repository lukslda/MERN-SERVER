const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');


//crea proyectos
// api/proyectos
router.post( '/' , 
    auth,
    proyectoController.crearProyectos 
);

router.get('/',
    auth,
    proyectoController.crearProyectos
)

module.exports = router;