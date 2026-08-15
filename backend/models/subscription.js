import {DataTypes} from "sequelize";
import {sequelize} from "../config/db.js";

const Subscription = sequelize.define("Subscription",{
    email:{type:DataTypes.STRING, allowNull:true, unique:true}
},{
    tableName:"subcription",
    timestamps:true
})

export default Subscription;