import Sequelize from "sequelize";
import bcrypt from 'bcrypt';
import db from "../config/db.js";

//Nombre del modelo en mayúsculas , db.define(nombre de la tabla)
export const User = db.define('user', {
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_name: {
        type: Sequelize.STRING
    },
    user_email: {
        type: Sequelize.STRING
    },
    user_password: {
        type: Sequelize.STRING
    },
    user_created_at: {
        type: Sequelize.DATE
    },
    user_modify_at: {
        type: Sequelize.DATE
    },
    user_status: {
        type: Sequelize.STRING
    }
}, 
{
    hooks: {
        beforeCreate: async function(datos) {
            const salt = await bcrypt.genSalt(10)
            datos.user_password = await bcrypt.hash(datos.user_password, salt);
        }
    },
    freezeTableName: true
},
    { freezeTableName: true },
    
);