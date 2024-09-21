import { SiweMessage } from "siwe";
import { InvalidError } from "../utils/errors";
import { generateToken } from "../utils/utils";
import { findUserByWallet } from "./userservice";

function createSiweMessage (address: string, statement: string) {
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

export async function getToken(wallet: string, sig: string) {
    const user = await findUserByWallet(wallet);
    const valid = await validateSig(wallet, sig, user.nonce);
    if (!valid) {
        throw new InvalidError("Invalid signature");
    }
    return generateToken(user);
}

export async function getNonce(walletAddress: string) {
    const user = await findUserByWallet(walletAddress);
    return user.nonce;
}
