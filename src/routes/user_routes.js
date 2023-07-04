import express from "express";
import {session_validation} from "../validators/session_validation.js";
import { users_view, prueba_view } from "../controllers/user_controller.js";

//Para renderizar las vistas
const user_routes = express.Router();

//Get para recibir vistas 
user_routes.get("/users", session_validation, users_view);
user_routes.get("/prueba", session_validation, prueba_view);

user_routes.get("/:id", (req, res, next) => {
    const { params } = req;
    res.send('Ver un usuario');
});

export default user_routes;