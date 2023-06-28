import express from "express";
import cors from "cors";
import {} from "dotenv/config"


import user_router from "./src/routes/user_routes.js";
import api_user_router from "./src/routes/api_user_routes.js";
import db from "./src/config/db.js";
import session from "express-session";



const app = express(); 
app.use(cors());

//Carpeta Pública
app.use(express.static('./src/public'));

app.use(express.urlencoded({extended: true}));
app.use(express.json()); //Enviar diferentes respuetsas de tipo json - ayuda a responder en formato json

//configurar sesion de los usuarios
app.use(session ({
    secret: "mpmsdfiwefmpsdfa", //Token de seguridad
    resave: false, //Sesión pueda modificarse en la ejecución del programa
    saveUnitialized: false //No guardar sesiones si el usuario no se autenticó
}));

//Habilitar ejs
app.set('view engine', 'ejs'); //Establecemos que vamos a usar EJS
app.set('views', './src/views'); //Directorio donde se encuentra

const port = process.env.PORT || 3000;
const base_url = process.env.BASE_URL || "http://localhost:3000";


app.use("/user", user_router);
app.use("/api/user", api_user_router);



app.get("/", (req, res, next) => {
    const frutas= ["manzana", "melon", "platano"];
    res.render('index', {
        base_url: process.env.BASE_URL,
        frutas: frutas //Pasamos el arreglo a la vista
    });

});

app.get("/login", (req, res, next) => {
    res.render('login', {
        base_url: process.env.BASE_URL
    });
});

app.get("/dashboard", (req, res, next) => {
    res.render('dashboard', {
        base_url: process.env.BASE_URL
    });
});

db.authenticate()
    .then(() => {console.log("Base de datos conectada");})
    .catch(error => {console.log(error);})

app.listen(port, () => {
    console.log(` Servidor activo en el puerto ${port}`);
    console.log(` Ruta del servidor ${base_url}`);
});

