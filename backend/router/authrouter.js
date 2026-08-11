import express from 'express';
import {adminAuth} from '../Middleware/auth.js';
import {createProduct} from '../controller/productController.js'
import {login} from '../controller/authController.js';

const router = express.Router();
router.post('/login',login)

router.post('/product',createProduct);
export default router;