const Proyecto = require('../models/Proyecto');


exports.crearProyectos = async (req, res) => {
    try {
        //crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);
        
        //guardar el creador via JWT
        proyecto.creador = req.usuario.id;

        //guardamos el proyecto
        proyecto.save();
        res.json(proyecto);
        

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}