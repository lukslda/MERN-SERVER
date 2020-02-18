const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { } = require('express-validator');
const {validationResult} = require('express-validator');


exports.crearTarea = async (req, res) => {

    //revisar si existen errores
    const errores = validationResult(req);
    if ( !errores.isEmpty() ){
        return res.status(400).json({errores: errores.array() })
    }

    try {

        // extraer el proyecto
        const { proyecto } = req.body;

        // comprobar si el proyecto existe o no
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' })
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({ msg: 'Acceso no autorizado'})
        }

        //guardamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// obtiene todas las tareas por proyecto (listar)
exports.obtenerTareas = async ( req, res) => {

    try {
         // extraer el proyecto
         const { proyecto } = req.body;

         // comprobar si el proyecto existe o no
         const existeProyecto = await Proyecto.findById(proyecto);
         if(!existeProyecto) {
             return res.status(404).json({ msg: 'Proyecto no encontrado' })
         }
 
         // Revisar si el proyecto actual pertenece al usuario autenticado
         if (existeProyecto.creador.toString() !== req.usuario.id ) {
             return res.status(401).json({ msg: 'Acceso no autorizado'})
         }

         //obtener las tareas por proyecto
         const tareas = await Tarea.find({ proyecto })
         res.json({ tareas });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// actualizar una tarea (modificar)
exports.actualizarTarea = async (req, res) => {
    
    try {

        //extraer la informacion de la tarea
        const { nombre, estado, proyecto } = req.body;

        // si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);
        if(!tarea) {
            return res.status(404).json({ msg: 'Tarea no encontrada' })
        }

        // extraer proyecto 
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({ msg: 'Acceso no autorizado'})
        }

        // crear un objeto con la nueva informacion
        const nuevaTarea = {};

        if (nombre) {nuevaTarea.nombre = nombre;}
        if (estado) {nuevaTarea.estado = estado;}
        
        // guardar la tarea
        tarea = await Tarea.findByIdAndUpdate({ _id: req.params.id },nuevaTarea , { new : true });
        res.json({ tarea });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

//elimina una tarea por su ID
exports.eliminarTarea = async (req, res) => {
    try {

        // si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);
        if(!tarea) {
            return res.status(404).json({ msg: 'Tarea no encontrada' })
        }

        // extraer proyecto
        const { proyecto } = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({ msg: 'Acceso no autorizado'})
        }

        //Eliminar la tarea
        await Tarea.findOneAndRemove({ _id : req.params.id});
        res.json({msg: 'Tarea eliminada'})

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}
