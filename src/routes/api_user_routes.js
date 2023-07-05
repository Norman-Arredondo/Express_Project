import express from "express";

import { new_user_validation,
     login_validation 
    } from "../validators/user_validations.js";
import { new_user, login, verify_token, users_view} from "../controllers/user_controller.js";

const api_user_router = express.Router();

api_user_router.get("/", (req, res, next) => {
    //All users
    res.send("usuarios");
});

api_user_router.get("/:id", verify_token, (req, res, next) => {
    const {params} = req;
    // Envia informacion de un usuario
    console.log("params:", params);
    res.send(`Ver usuario ${params.id}`)
});

api_user_router.put("/", verify_token, (req, res, next) => {
    const { body } = req;
    // Edita un usuario recibe por body
    console.log("params:", params);
    res.send(`Ver usuario ${params.id}`)
});

api_user_router.delete("/:id", verify_token, (req, res, next) => {
    const {params} = req;
    // elimina un usuario
    console.log("params:", params);
    res.send(`Ver usuario ${params.id}`)
});

//Endpoint para registro de usuarios
//Registra un nuevo Usuario
api_user_router.post("/", new_user_validation, new_user);
api_user_router.post("/login", login_validation, login);
api_user_router.post("/users/users", users_view, );

export default api_user_router;

/* 
    Editar usuario

    Vista                                       
    consultar los datos del usuario             
    y llenar el formulario

    JS
    Funciones para validar formulario
    y envio de datos al API

    API
    Validador
    Validar los datos que llegan desde el formulario

    Controlador
    Recibe los datos y actualiza el registro
==============================================
    nuevo usuario

    Vista                                       
    mostrar el formulario

    JS
    Funciones para validar formulario
    y envio de datos al API

    API
    Validador
    Validar los datos que llegan desde el formulario

    Controlador
    Recibe los datos y crea un registro
*/