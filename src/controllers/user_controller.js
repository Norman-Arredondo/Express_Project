import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import moment from "moment/moment.js";
import jwt from "jsonwebtoken";
import { } from "dotenv/config"; //variables de entorno
import { User } from "../models/user_model.js";
import { Op } from 'sequelize';


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
            user_id: user.user_id,
            user_name: user.user_name
        });
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

//Dashboard VIEW para mostrar usuarios con estatus A
export const users_view = async (req, res, next) => {
    try {
        const users = await User.findAll({
            where: { user_status: 'A' },
        });

        res.render("dashboard", {
            base_url: process.env.BASE_URL,
            users: users,
        })

    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

// Buscador en Dashboard (POST)
export const buscador_dashboard_post = async (req, res, next) => {
    try {
        const searchTerm = req.body.buscador;

        // Realizar la búsqueda y filtrar los usuarios con el campo user_status igual a 'A'
        const users = await User.findAll({
            where: {
                user_status: 'A',
                user_email: { [Op.like]: `%${searchTerm}%` }
            }
        });

        res.json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
}

// Eliminar Usuario VIEW
export const delete_user_view = async (req, res, next) => {
    try {

        const user_exist = await User.findOne({ where: { user_id: req.params.user_id } });
        console.log("user_id: ", user_exist.user_id)
        if (user_exist !== null) {
            res.render("delete_user_view", {
                base_url: process.env.BASE_URL,
                user: user_exist

            })
        }
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

// Eliminar Usuario (DELETE)
export const status_user_delete = async (req, res, next) => {
    try {
        //No vamos a borrar, vamos a actualizar el status de A a I
        const user_update = await User.update({ user_status: "I" }, {
            where: {
                user_id: req.params.user_id
            }
        })

        res.json({
            respuesta: user_update,
        })

    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

// Editar Usuario VIEW
export const edit_user_view = async (req, res, next) => {
    try {

        const user_exist = await User.findOne({ where: { user_id: req.params.user_id } });

        if (user_exist !== null) {
            res.render("editar_user_view", {
                base_url: process.env.BASE_URL,
                user: user_exist
            });
        }
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

// Actualizar/Editar Usuario (PUT)
export const edit_user_put = async (req, res, next) => {
    try {
        // Obtiene el ID del usuario de los parámetros de la URL
        const { user_id } = req.params;

        // Obtiene los campos enviados en el cuerpo de la solicitud
        const { user_name, user_email, user_password } = req.body;

        // Busca el usuario en la base de datos utilizando el ID
        const user = await User.findByPk(user_id);

        // Verifica si el usuario existe
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Verifica si se proporcionó un valor para el campo "user_name" y lo actualiza en el objeto "user"
        if (user_name) {
            user.user_name = user_name;
        }

        // Verifica si se proporcionó un valor para el campo "user_email" y lo actualiza en el objeto "user"
        if (user_email) {
            user.user_email = user_email;
        }

        // Verifica si se proporcionó un valor para el campo "user_password" y lo actualiza en el objeto "user"
        if (user_password) {
            user.user_password = user_password;
        }

        // Guarda los cambios en la base de datos utilizando el método "update()" del modelo Sequelize
        await user.update();

        // Responde con un mensaje de éxito y el objeto "user" actualizado
        res.json({
            mensaje: 'Usuario actualizado correctamente',
            usuario_actualizado: user,
        });
    } catch (error) {
        // Si ocurre un error, se envía una respuesta con el código de estado 400 y el mensaje de error
        res.status(400).send(error);
        next();
    }
};

// Formulario Crear Nuevo Usuario/Cuenta VIEW
export const create_new_user_view= async (req, res, next) => {
    try {
        res.render("create_new_user_view", {
            base_url: process.env.BASE_URL,
        })
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

// Crear Nuevo Usuario/Cuenta (POST)
export const create_new_user_post = async (req, res, next) => {
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
            usuario_creado: new_user_created,
        });
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}








export const registro_view = async (req, res, next) => {
    res.render('registro', {
        base_url: process.env.BASE_URL,
        errores: [],
        usuario: {},
        duplicado: [],

    })
}
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


