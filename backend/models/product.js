import {DataTypes} from 'sequelize';
import {sequelize} from '../config/db.js';

const Product = sequelize.define("product",{
    name:{type:DataTypes.STRING, },
    brand:{type:DataTypes.STRING, },
    category:{type:DataTypes.STRING, },
    subCategory:{type:DataTypes.STRING, allowNull:false},
    price:{type:DataTypes.DECIMAL(10,2)},    
    Ratings:{type:DataTypes.DECIMAL(2,1)},
    image:{type:DataTypes.STRING,},

    discription:{type:DataTypes.TEXT},
    amazonAffiliateUrl:{type:DataTypes.STRING},
    prosText:{type:DataTypes.JSONB,defaultValue:[]},
    consText:{type:DataTypes.JSONB,defaultValue:[]},
    bestForText:{type:DataTypes.JSONB,defaultValue:[]},
    ingredients:{type:DataTypes.TEXT},
    status:{
        type:DataTypes.ENUM("draft", "Published"),
        defaultValue:"draft",
    }


},{
    tableName:"product",
    timestamps:true,
});
export default Product;
