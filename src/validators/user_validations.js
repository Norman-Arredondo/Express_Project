import { check } from "express-validator";

export const new_user_validation = [
    //Validaciones para campos para post
    check("user_name", "El campo user_name es obligatorio").not().isEmpty(),
    check("user_password", "El password debe ser minimo de 6 caracteres").isLength({ min: 6 }),
    check("user_email", "Ingresa un email valido").isEmail()
];

export const login_validation = [
    //Validaciones para campos para post
   
    check("user_password", "El password debe ser minimo de 6 caracteres").isLength({ min: 6 }),
    check("user_email", "Ingresa un email valido").isEmail()
];