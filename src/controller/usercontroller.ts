import { Request, NextFunction, Response } from "express";
import { createUser, findUserByWallet, getAllUsers } from "../service/userservice";
import { User } from "../types";
import { InvalidError } from "../utils/errors";


// Create a new User
export async function post(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.body as User;
        const valid = user.walletAddress && user.userType
        if (!valid) {
            throw new InvalidError("Incorrect user input missing either walletAddress or userType");
        }
        const existingUser = await findUserByWallet(user.walletAddress);
        if (existingUser) {
            throw new InvalidError("User already exists!!");
        } else {
            const value = await createUser(user);
            res.status(201).json(value);
        }
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
