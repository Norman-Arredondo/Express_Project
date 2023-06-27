import express from "express";

const user_router = express.Router();
user_router.get("/", (req, res, next) => {
    res.send("Usuarios");
});

user_router.get("/:id", (req, res, next)=> {
    const {params} = req;
    res.send('Ver un usuario');
});

export default user_router;