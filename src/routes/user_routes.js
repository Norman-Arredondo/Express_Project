import express from "express";
import { session_validation } from "../validators/session_validation.js";
import { users_view, delete_user_view, edit_user_view, create_new_user_view, registro_view, registrar, } from "../controllers/user_controller.js";

//Para renderizar las vistas
const user_routes = express.Router();
//Get para recibir vistas 


// Vista del Dashboard
user_routes.get("/dashboard", session_validation, users_view);

// Vista  Formulario Eliminar usuario
user_routes.get('/delete/:user_id', session_validation, delete_user_view);

// Vista Formulario editar Usuario
user_routes.get('/edit/:user_id', session_validation, edit_user_view);

// Vista para Formulario crear Nuevo Usuario
user_routes.get('/create/new_user', session_validation, create_new_user_view);

//Vista Nuevo Usuario
user_routes.get("/registro", registro_view);
user_routes.post("/registro", registrar);




export default user_routes;