import express from "express";

import { new_user_validation,
     login_validation 
    } from "../validators/user_validations.js";
import { login, buscador_dashboard_post, status_user_delete, edit_user_put, create_new_user_post} from "../controllers/user_controller.js";

const api_user_router = express.Router();

// Login
api_user_router.post('/login', login_validation, login);

// Buscador
api_user_router.post('/', buscador_dashboard_post);

//Eliminar usuario
api_user_router.delete('/:user_id', status_user_delete);

// Editar Usuario
api_user_router.put('/:user_id', new_user_validation, edit_user_put);

// Crear cuenta - Nuevo Usuraio
api_user_router.post('/create', new_user_validation, create_new_user_post);


export default api_user_router;

/**
 * 
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
 */

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