import express from "express";
import {session_validation} from "../validators/session_validation.js";
import { users_view, registro_view, registrar, create_user_view, delete_user } from "../controllers/user_controller.js";

//Para renderizar las vistas
const user_routes = express.Router();
//Get para recibir vistas 


//Dashboard
user_routes.get("/users", session_validation, users_view);

//Vista Nuevo Usuario --Corregir
user_routes.get("/registro", registro_view);
user_routes.post("/registro", registrar);

//Vista Formulario Crear Nuevo Usuario
user_routes.get("/user/nuevo",create_user_view);

// Envia informacion de un usuario
user_routes.get('/delete/:user_id', delete_user);

//Formulario para editar un usuario
user_routes.get("/:id", );


export default user_routes;