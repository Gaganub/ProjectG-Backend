import { Router } from "express";
import * as productcontroller from "../controller/productcontroller";


export const productRouter = Router();
productRouter.post('/', productcontroller.post);
productRouter.get('/', productcontroller.get);
productRouter.get('/{id}', productcontroller.getProduct);
