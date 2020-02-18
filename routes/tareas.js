const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');


//crear una tarea
// api/tareas
router.post( '/' , 
    auth,
    [
        check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea 
);

//obtener todas las tareas por proyecto
router.get('/',
    auth,
    tareaController.obtenerTareas
);

// Actualizr las tareas por el ID
router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.actualizarTarea
);

// Eliminar una tarea
router.delete('/:id',
    auth,
    tareaController.eliminarTarea
);

module.exports = router;