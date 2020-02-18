const Usuario = require('../models/Usuario');
const bcryptjs = require('../node_modules/bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('../node_modules/jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
    //revisar si existen errores
    const errores = validationResult(req);
    if(!errores.isEmpty() ){
        return res.status(400).json({errores: errores.array() })
    }

    // extraer el email y password
    const {email, password} = req.body;

    try {
        // revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({email});
        if(!usuario) {
            return res.status(400).json({msg: 'El usuario no existe'})
        }

        //revisar el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password)
        
        if(!passCorrecto) {
            return res.status(400).json({msg:'Contraseña incorrecta'})
        }

        // si todo es correcto crear y firmar el jwt
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        //firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 432000 //3600 es una hora
        }, (error, token) => {
            if(error) throw error;

            //mensaje de confimarcion
            res.json({token});
        });

    } catch (error) {
        console.log(error);
    }
}