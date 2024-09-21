import { Request, NextFunction, Response } from "express";
import { getNonce } from "../service/rootservice";
import { getTokenAndUser } from "../service/rootservice";
import { getSignature, getWalletAddress } from "./controllerutils";

export async function nonce(req: Request, res: Response, next: NextFunction) {
    try {
        const walletAddress = req.body.walletAddress;
        if (!walletAddress) {
            throw new Error('Missing walletaddress in request body');
        }
        const nonce = await getNonce(walletAddress);
        res.status(200).json({nonce});
    } catch (e: any) {
        next(e);
    }
}


export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const {walletAddress, signature} = req.body;
        if (!walletAddress) {
            throw new Error('Missing walletaddress in request body');
        }
        if (!signature) {
            throw new Error('Missing signature in request body');
        }
        const data = await getTokenAndUser(walletAddress, signature);
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}