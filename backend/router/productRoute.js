import express from 'express';
import {getAllProducts,getProductById,deleteProduct} from '../controller/getAllProduct.js'

const route = express.Router();

route.get("/getProduct",getAllProducts);
route.get("/:id",getProductById);
route.delete("/delete/:id",deleteProduct)

export default route;