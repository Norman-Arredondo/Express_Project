import express from "express";
import {session_validation} from "../validators/session_validation.js";
import { users_view, registro_view, registrar} from "../controllers/user_controller.js";

//Para renderizar las vistas
const user_routes = express.Router();

//Get para recibir vistas 
user_routes.get("/users", session_validation, users_view);
user_routes.get("/registro", session_validation, registro_view);

user_routes.get("/users", session_validation, (req, res, next) => {
    const { params } = req;
   
res.send('Aquí debería ir el dashboard')
});

user_routes.get("/:id", session_validation, (req, res, next) => {
    const { params } = req;
    // agregar un formulario para editar un usuario
    res.send('/:id');
});

user_routes.get("/user/nuevo", session_validation, (req, res, next) => {
    const {params} = req;
    // agregar un formulario para crear un nuevo usuario
    console.log(params);
    res.send("/user/nuevo");
});

export default user_routes;