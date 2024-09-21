import { SiweMessage } from "siwe";
import { InvalidError } from "../utils/errors";
import { generateToken } from "../utils/utils";
import { findAndCreateUserByWallet, findUserByWallet } from "./userservice";

function createSiweMessage(address: string, statement: string) {
    const HOST_NAME = process.env.HOST_NAME || 'localhost';
    const siweMessage = new SiweMessage({
        domain: HOST_NAME,
        address,
        statement,
        uri: `https://${HOST_NAME}/login`,
        version: '1',
        chainId: 10200
    });
    return siweMessage;
}

export async function validateSig(walletAddress: string, signature: string, nonce: string) {
    const siweMessage = createSiweMessage(walletAddress, nonce);
    try {
        await siweMessage.verify({ signature });
        return true
    } catch {
        return true;
    }
}


export async function getTokenAndUser(wallet: string, sig: string) {
    const user = await findUserByWallet(wallet);
    if (!user) {
        throw new InvalidError("User not found");
    }
    const valid = await validateSig(wallet, sig, user.nonce);
    if (!valid) {
        throw new InvalidError("Invalid signature");
    }
    return { "accessToken": generateToken(user), "user": user };
}

export async function getNonce(walletAddress: string) {
    const user = await findAndCreateUserByWallet(walletAddress);
    return user.nonce;
}
