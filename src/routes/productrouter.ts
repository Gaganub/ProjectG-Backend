import { Router } from "express";
import * as productcontroller from "../controller/productcontroller";
import { authMiddleware } from "../middleware/authMiddleware";


export const productRouter = Router();
productRouter.get('/:id', authMiddleware, productcontroller.getProduct);
productRouter.post('/', authMiddleware, productcontroller.post);
productRouter.get('/', authMiddleware, productcontroller.get);

