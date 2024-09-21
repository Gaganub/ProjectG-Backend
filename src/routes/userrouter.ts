import { Router } from "express";
import * as usercontroller from "../controller/usercontroller";


export const userRouter = Router();
userRouter.post('/', usercontroller.post);
userRouter.get('/', usercontroller.get);
