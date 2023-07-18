import express from "express";
import {session_validation} from "../validators/session_validation.js";
import { users_view, registro_view, registrar, users_view_post } from "../controllers/user_controller.js";

//Para renderizar las vistas
const user_routes = express.Router();


//Get para recibir vistas 

//Lista de usuarios
user_routes.get("/users", session_validation, users_view);
user_routes.post('/users', users_view_post);

//Vista Nuevo Usuario
user_routes.get("/registro", registro_view);
user_routes.post("/registro", registrar);

// Envia informacion de un usuario
user_routes.post('/users/:id/eliminar', );

//Formulario para editar un usuario
user_routes.get("/:id", );


export default user_routes;