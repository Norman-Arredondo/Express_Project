import { check } from "express-validator";

export const new_user_validation = [
    //Validaciones para campos para post
    check("user_name", "El campo user_name es obligatorio").not().isEmpty(),
    check("user_password", "El password debe ser minimo de 6 caracteres").isLength({ min: 6 }),
    check("user_email", "Ingresa un email valido").isEmail()
];

export const registrar_validation = [
    check('user_name', 'El campo nombre no puede ir vacío').notEmpty().trim(),
    check('user_email', 'Ingresa un Email válido').isEmail().trim(),
    check('user_password', 'La contraseña debe de ser de exactamente 6 caracteres').isLength({ min: 6, max: 6 }),
    
];



export const login_validation = [
    //Validaciones para campos para post

    check("user_password", "El password debe ser minimo de 6 caracteres").isLength({ min: 6 }),
    check("user_email", "Ingresa un email valido").isEmail()
];