import { Router } from "express";
import * as usercontroller from "../controller/usercontroller";
import { authMiddleware } from "../middleware/authMiddleware";


export const userRouter = Router();
userRouter.post('/', authMiddleware, usercontroller.post);
userRouter.get('/', authMiddleware, usercontroller.get);
