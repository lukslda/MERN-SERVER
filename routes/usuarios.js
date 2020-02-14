//rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const {check} = require('express-validator');


// Crea un usuario
// api/usuarios
router.post('/',
    [
      check('nombre', 'El campo nombre es obligatorio').not().isEmpty(),
      check('email','Email no valido').isEmail(),
      check('password', 'La contraseña debe ser tener un minimo de 6 caracteres').isLength({min:6}) 
    ],
    usuarioController.crearUsuario
);

module.exports = router;