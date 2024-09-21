import { Router } from "express";
import * as productcontroller from "../controller/productcontroller";


export const productRouter = Router();
productRouter.get('/:id', productcontroller.getProduct);
productRouter.post('/', productcontroller.post);
productRouter.get('/', productcontroller.get);

