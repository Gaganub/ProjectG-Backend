import { Router } from "express";
import * as rootcontroller from "../controller/rootcontroller";


export const rootRouter = Router();
rootRouter.get('/nonce', rootcontroller.nonce)
rootRouter.get('/login', rootcontroller.login)
