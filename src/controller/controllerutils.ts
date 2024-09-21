import { Request, NextFunction, Response } from "express";

export const getWalletAddress = (req: Request) => {
    const walletAddress = req.headers?.walletaddress || '';
    if (Array.isArray(walletAddress)) {
        return undefined;
    }
    return walletAddress.toString();
};

export const getSignature = (req: Request) => {
    const signature = req.headers?.signature || '';
    if (Array.isArray(signature)) {
        return undefined;
    }
    return signature.toString();
};