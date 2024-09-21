import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AuthRequest, User } from '../types';
import { UnauthorizedError } from '../utils/errors';

import { PrismaClient } from '@prisma/client';
import { findUserByWallet } from '../service/userservice';

const prisma = new PrismaClient();

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new UnauthorizedError("Token not found");
        }
        const decoded = verify(token, process.env.JWT_SECRET_KEY as string);
        let user = await findUserByWallet((decoded as any).walletAddress);
        if (!user) {
            throw new UnauthorizedError("User not found");
        }
        req.user = user as User;
        next();
    } catch (error) {
        next(error);
    }
}