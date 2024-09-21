import { Request, NextFunction, Response } from "express";
import { getNonce } from "../service/rootservice";
import { getToken } from "../service/rootservice";
import { getSignature, getWalletAddress } from "./controllerutils";

export async function nonce(req: Request, res: Response, next: NextFunction) {
    const walletAddress = getWalletAddress(req);
    if (walletAddress) {
        try {
            const nonce = await getNonce(walletAddress);
            res.status(200).json(nonce);
        } catch (e: any) {
            next(e)
        }
    } else {
        res.status(400).json({ error: 'Invalid walletaddress in request headers' });
    }
}


export async function login(req: Request, res: Response, next: NextFunction) {
    const walletAddress = getWalletAddress(req);
    if (!walletAddress) {
        return res.status(400).json({ error: 'Missing walletaddress in request headers' });
    }
    const signature = getSignature(req);
    if (!signature) {
        return res.status(400).json({ error: 'Missing signature in request headers' });
    }
    try {
        const token = await getToken(walletAddress, signature)
        return res.status(200).json({ accessToken: token });
    } catch (e: any) {
        next(e);
    }
}