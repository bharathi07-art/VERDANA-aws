import {DataTypes} from 'sequelize';
import { sequelize } from '../config/db.js';
import product from './product.js';

const productImg = sequelize.define("ProductImage",{
    url:{type:DataTypes.STRING, allowNull:false},
    alttext:{type:DataTypes.STRING},
    sortOrder:{type:DataTypes.INTEGER,defaultValue:0},
},{
    tableName:"product_images",
    timestamps:false,
});

//one product has many images - this is relational link
product.hasMany(productImg,{foreignKey:"productId", onDelete:"CASCADE"});
productImg.belongsTo(product, {foreignKey:"productId"});
 export default productImg;