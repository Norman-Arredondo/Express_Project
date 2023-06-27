import express from "express";
import { new_user_validation } from "../validators/user_validations.js";
import { new_user } from "../controllers/user_controller.js";

const api_user_router = express.Router();

api_user_router.get("/", (req, res, next) => {
    res.send("usuarios");
});

api_user_router.get("/:id", (req, res, next) => {
    const { params } = req; //req es un arreglo enorme
    console.log("params:", params);
    res.send(`Ver usuario ${params.id}`);
});

//Endpoint para registro de usuarios
api_user_router.post("/", new_user_validation, new_user);

export default api_user_router;