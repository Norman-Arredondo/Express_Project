import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import moment from "moment/moment.js";
import { User } from "../models/user_model";

export const new_user = async (req, res, next) => {

    try {

        const errores = validationResult(req);
    if (!errores.isEmpty()) {
        res.status(400).json({ errores: errores.array() });
        return;
    }

    
    const { body } = req;


    //Si el usuario ya existe
    const user_exist = await User.findOne({where: {user_name : body.user_name}});

    if(user_exist !== null){
        res.status(400).send("El usuairo ya existe en el sistema"); 
        return;
    }

    //Encriptar password
    const saltRounds = 10; 
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(body.user_password, salt);


    // Guardar nuevo regisro en la BD
    const new_user_created = await User.create({
        user_name: body.user_name,
        user_email: body.user_email,
        user_password: hash,
        user_created_at: moment().format("YYYY-MM-DD hh:mm:ss"),
        user_modify_at: moment().format("YYYY-MM-DD hh:mm:ss"),
        user_status: "A"
    });


    res.json({
        user_name: new_user_created.user_name,
        created_at: new_user_created.user_created_at
        });

    } catch (error) {
        res.status(400).send(error);
        next();
    }
}