import express from 'express';
import {getAllProducts,getProductById} from '../controller/getAllProduct.js'
const route = express.Router();

route.get("/getProduct",getAllProducts);
route.get("/:id",getProductById);

export default route;