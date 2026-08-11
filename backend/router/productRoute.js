import express from 'express';
import {getAllProducts,getProductById,deleteProduct} from '../controller/getAllProduct.js'
import {adminAuth} from '../Middleware/auth.js';
const route = express.Router();

route.get("/getProduct",getAllProducts);
route.get("/:id",getProductById);
route.get("/delete/id",adminAuth,deleteProduct)

export default route;