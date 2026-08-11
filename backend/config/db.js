import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(process.env.DB_URI,{
    dialect:"postgres",
    dialectOptions:{
        ssl:{
            require:true,
            rejectUnauthorized:false,
        },
    },
    logging: false,
});

export async function connectPostgres(){
    try{
        await sequelize.authenticate();
        console.log("[verdana] PostgreSQL connected")
    }catch(err){
        console.error("[verdaba] PostgreSQL connection failed:", err.message);
        process.exit(1);
    }
}