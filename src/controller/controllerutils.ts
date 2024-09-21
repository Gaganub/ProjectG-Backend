import { Request, NextFunction, Response } from "express";

export const getWalletAddress = (req: Request) => {
    console.log(req.body);
    const walletAddress = req.body.walletAddress;
    if (!walletAddress) {
        throw new Error('Missing walletaddress in request body');
    }
    return walletAddress.toString();
};

export const getSignature = (req: Request) => {
    const signature = req.body.signature;
    if (!signature) {
        throw new Error('Missing signature in request body');
    }
    return signature.toString();
};