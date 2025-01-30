import { Router } from "express";
import multer from "multer";
import multerConfig from './config/multer.js'
import authMiddleware from "./app/middlewares/auth.js";

import UserController from "./app/controllers/UserController.js";
import SessionController from "./app/controllers/SessionController.js";
import ProductController from "./app/controllers/ProductController.js";
import CategoryController from "./app/controllers/CategoryController.js";
import OrderController from "./app/controllers/OrderController.js";


const upload = multer(multerConfig)
const routes = new Router



routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)


routes.use(authMiddleware)

routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products',ProductController.index)
routes.post('/category',CategoryController.store)
routes.get('/category',CategoryController.index)
routes.post('/orders',OrderController.store)
routes.get('/orders',OrderController.index)
routes.put('/orders/:id', OrderController.update)



export default routes