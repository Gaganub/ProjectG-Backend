import { Router } from "express";
import * as ordercontroller from "../controller/ordercontroller";


export const orderRouter = Router();
orderRouter.post('/', ordercontroller.post);
orderRouter.get('/', ordercontroller.get);
orderRouter.get('/{id}', ordercontroller.getOrder);
