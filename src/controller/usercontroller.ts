import { Request, NextFunction, Response } from "express";
import { createUser, getAllUsers } from "../service/userservice";
import { User } from "../types/user";


// Create a new User
export async function post(req: Request, res: Response, next: NextFunction) {
    try {
        const value = await createUser(req.body as User);
        res.status(201).json(value);
    } catch (e: any) {
       next(e)
    }
}

// Get list of Users
export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (e: any) {
        next(e);
    }
}
