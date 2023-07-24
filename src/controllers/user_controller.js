import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import moment from "moment/moment.js";
import jwt from "jsonwebtoken";
import { } from "dotenv/config"; //variables de entorno
import { User } from "../models/user_model.js";
import { Op } from 'sequelize';


//Formulario para Crear usuario ---Corregir
export const registro_view = async (req, res, next) => {
    res.render('registro', {
        base_url: process.env.BASE_URL,
        errores: [],
        usuario: {},
        duplicado: [],

    })
}
//Formulario para Crear usuario ---Corregir
export const registrar = async (req, res, next) => {

    try {
        //Validación
        await check('user_name').notEmpty().trim().withMessage('El campo nombre no puede ir vacío').run(req);
        await check('user_email').isEmail().trim().withMessage('Ingresa un Email válido').run(req);
        await check('user_password').isLength({ min: 6, max: 6 }).withMessage('La contraseña debe de ser de exactamente 6 caracteres').run(req);
        await check('repetir_password').equals(req.body.user_password).withMessage('Las contraseñas deben de ser iguales').run(req);

        let resultado = validationResult(req); //Guarda el resultado de la validación
        //console.log(resultado.array())
        //Verificar que el resultado esté vacío
        if (!resultado.isEmpty()) {
            //Errores
            return res.render('registro', {
                base_url: process.env.BASE_URL,
                errores: resultado.array(), //El resultado lo convertimos a un array
                usuario: {
                    user_name: req.body.user_name,
                    user_email: req.body.user_email
                },
                duplicado: [],
            })
        }

        //Validar que no exista el usuario previamente
        const user_exist = await User.findOne({ where: { user_email: req.body.user_email } });
        if (user_exist !== null) {
            return res.render('registro', {
                base_url: process.env.BASE_URL,
                errores: resultado.array(),
                usuario: {
                    user_name: req.body.user_name,
                    user_email: req.body.user_email
                },
                duplicado: [
                    { msg: 'El email ingresado ya está asociado a una cuenta' }
                ],
            })
        }

        //Almcacenar un usuario
        const { user_name, user_email, user_password } = req.body
        const usuario = await User.create({
            user_name,
            user_email,
            user_password,
            user_created_at: moment().format("YYYY-MM-DD hh:mm:ss"),
            user_modify_at: moment().format("YYYY-MM-DD hh:mm:ss"),
            user_status: 'A' //Se encuentra en helpers
        });

        //Mostrar mensaje de confirmación
        res.render('templates/mensaje', {
            base_url: process.env.BASE_URL,
            pagina: 'Cuenta Creada Correctamente',
        });


        //res.json(resultado.array());
        //const usuario = await User.create(req.body)
        //res.json(usuario)

    } catch (error) {
        res.status(400).send(error);
        next();
    }

}

//Crear un Usuario
export const new_user = async (req, res, next) => {
    try {
        // Validar errores con express-validator
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            res.status(400).json({ errores: errores.array() })
            return;
        }

        const { body } = req;
        //Validar que no exista el usuario previamente
        const user_exist = await User.findOne({ where: { user_name: body.user_name } });
        if (user_exist !== null) {
            res.status(400).send("El usuario ya existe en el sistema");
            return;
        }

        // Encriptar password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(body.user_password, salt);

        // Guardar nuevo registro en la base de datos
        const new_user_created = await User.create({
            user_name: body.user_name,
            user_email: body.user_email,
            user_password: hash,
            user_created_at: moment().format("YYYY-MM-DD hh:mm:ss"),
            user_modify_at: moment().format("YYYY-MM-DD hh:mm:ss"),
            user_status: "A"

        })

        // Respuesta
        res.json({
            user_name: new_user_created.user_name,
            created_at: new_user_created.user_created_at
        });
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

//Login
export const login = async (req, res, next) => {
    try {

        // Validar errores con express-validator
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            res.status(400).json({ errores: errores.array() })
            return;
        }
        const { body } = req;

        // Verificar si el usuario existe
        const user = await User.findOne({ where: { user_email: body.user_email } });
        if (!user) {
            res.status(400).json({ error: "El usuario no existe en la base de datos" })
            return;
        }
        // Verificar que la contraseña sea correcta
        const match = await bcrypt.compare(body.user_password, user.user_password);
        if (!match) {
            res.status(400).json({ error: "La contraseña es incorrecta" })
            return;
        }
        // Se crea el token de seguridad
        // Payload
        const payload = { user_id: user.user_id }
        const { sign } = jwt;
        const token = sign(payload, process.env.TOKEN_SECRET, { expiresIn: (60000 * 30) })
        console.log("token::::", token);

        // Se crea la sesión del usuario
        req.session.user_id = user.user_id;
        req.session.loged = true;

        // Se genera respuesta con el token de seguridad en el header
        res.header("auth-token", token).json({
            token: token,
            user_id: user.user_id
        });
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

//Proteger las rutas que son parte de la API
export const verify_token = (req, res, next) => {
    const { verify } = jwt;
    const token = req.header("auth-token")
    if (!token) {
        res.status(400).send("Acceso denegado");
        next();
    }
    try {
        const verified = verify(token, process.env.TOKEN_SECRECT);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send("Token invalido");
        next();
    }
}

export const edit_user_view = async (req, res, next) => {
    try {
        //consultamos el usuario
        console.log("ID: ", req.params.user_id);

        const user_exist = await User.findOne({ where: { user_id: req.params.user_id } });
        console.log("user_id: ", user_exist.user_id)
        if (user_exist !== null) {
            res.render("editar-registro", {
                base_url: process.env.BASE_URL,
                user: user_exist
                // user: user_exist
            })
        }
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

//Dashboard para mostrar usuarios con estatus A
export const users_view = async (req, res, next) => {
    try {
        const users = await User.findAll({
            where: { user_status: 'A' },
        });

        res.render("users", {
            base_url: process.env.BASE_URL,
            users: users,
        })
        /*
        const users = await User.findAll({ where: { user_status: 'A' } });
        res.render("users", {
            base_url: process.env.BASE_URL,
            users: users
        })*/
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

export const users_view_post = async (req, res, next) => {
    try {
        const searchTerm = req.body.searchTerm;
        const users = await User.findAll({
            where: {
                user_status: 'A',
                user_email: { [Op.like]: `%${searchTerm}%` },
            },
        });
        res.json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

//Recargamos la vista de create user
export const create_user_view = async (req, res, next) => {
    try {
        res.render("new-user", {
            base_url: process.env.BASE_URL,
            errores: [],
            usuario: {},
            duplicado: [],
        })
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

export const delete_user = async (req, res, next) => {
    try{
        //consultamos el usuario
        //console.log("ID: ",req.params.user_id);

        const user_exist = await User.findOne({where: {user_id: req.params.user_id}});
        console.log("user_id: ",user_exist.user_id)
        if(user_exist !== null){
            res.render("delete",{
                base_url: process.env.BASE_URL,
                user: user_exist
                
            })
        }
    }catch (error) {
        res.status(400).send(error);
        next();
    }
}

export const status_user = async (req,res,next) => {
    try{
        //No vamos a borrar, vamos a actualizar el status de A a I
        const user_update = await User.update({user_status:"I"},{
            where:{
                user_id: req.params.user_id
            }
        })

        res.json({
            respuesta: user_update,
        })

    }catch(error){
        res.status(400).send(error);
        next();
    }
}