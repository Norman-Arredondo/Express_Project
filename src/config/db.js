import Sequelize  from "sequelize";
import {} from "dotenv/config";

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql", 
    define: { 
        timestamps: false,
    }, 
    pool: { 
        //Tiempo de espera y consultas simultaneas
        max: 5,
        min: 0,
        acquire: 3000000,
        idle: 10000
    },
    operatorAliases: false
});//nombre de la BD

export default db;