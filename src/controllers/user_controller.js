import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import moment from "moment/moment.js";
import jwt from "jsonwebtoken";
import {} from "dotenv/config"; //variables de entorno

import { User } from "../models/user_model.js";

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

export const login = async (req, res, next) => {
    try {
        res.send('login');

        // Verificar si el usuario existe
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            res.status(400).json({ errores: errores.array() })
            return;
        }
        const { body } = req;

        //Verificar si el usuario existe
        const user = await User.finOne({ where: { user_email: body.user_email } });
        if (!user) {
            res.status(400).send({ error: 'El usuario no existe en la base de datos' })
            return;
        }

        //Verificar que la contraseña sea correcta
        const match = await bycrypt.compare(body.user_password, user_password);
        if (!match) {
            res.status(400).send({ error: 'Contraseña incorrecta' })
            return;
        }

        //Pay load
        //Se crea el token de seguridad
        const payload = {user_id: user.user_id}
        const {sign} = jwt;
        const token = sign(payload, process.env.TOKEN_SECRET, {expiresIn: (60000*30)});
        console.log("token::::", token)
        
       
        //Se crea la sesión del usuario
        req.session.user_id = user.user_id;
        req.session.loged = true;

        res.session.loged = true;
        res.header('auth-token', token).json({
            token: token,
            user_id: user.user_id
        });
        res.send('login');
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

export const verify_token = () => {
    const {verify} = jwt;
    const token = req.header('auth-token');
    if(!token) {
        res.user_status(400).send('Acceso denegado');
        return;
    }
    try {
        const verified = verify(token, process.env.TOKEN_SECRET);
        req.user = verified; 
        next();
    }catch (error) {
        res.status(400).send('Token invalido');
        next();
    }
}