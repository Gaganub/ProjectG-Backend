import { Router } from "express";
import * as rootcontroller from "../controller/rootcontroller";


export const rootRouter = Router();
rootRouter.post('/nonce', rootcontroller.nonce)
rootRouter.post('/login', rootcontroller.login)
