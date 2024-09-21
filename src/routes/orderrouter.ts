import { Router } from "express";
import * as ordercontroller from "../controller/ordercontroller";
import { authMiddleware } from "../middleware/authMiddleware";


export const orderRouter = Router();
orderRouter.post('/', authMiddleware, ordercontroller.post);
orderRouter.get('/', authMiddleware, ordercontroller.get);
orderRouter.get('/:id', authMiddleware, ordercontroller.getOrder);
