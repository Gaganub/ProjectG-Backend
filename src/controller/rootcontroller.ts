import { Request, NextFunction, Response } from "express";
import { getNonce } from "../service/rootservice";
import { getToken } from "../service/rootservice";

export async function nonce(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;
    if (!headers.walletaddress) {
        res.status(400).json({ error: 'Missing walletaddress in request headers' });
    } else {
        try {
            const nonce = await getNonce(headers.walletaddress)
            return res.status(200).json(nonce);
        } catch (e: any) {
            next(e)
        }
    }
}


export async function login(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;
    if (!headers.walletaddress) {
        return res.status(400).json({ error: 'Missing walletaddress in request headers' });
    }
    if (!headers.signature) {
        return res.status(400).json({ error: 'Missing signature in request headers' });
    }
    try {
        const token = await getToken(headers.walletaddress, headers.signature)
        return res.status(200).json({ accessToken: token });
    } catch (e: any) {
        next(e);
    }
}