import { InvalidError } from "../utils/errors";
import { findUserByWallet } from "./userservice";

export function validateSig(sig: string | string[]) {
    return false;
}

export async function getToken(wallet: string | string[], sig: string | string[]) {
    const valid = validateSig(sig);
    if (!valid) {
        throw new InvalidError("Invalid signature");
    }

    const user = await findUserByWallet(wallet);
    if (!user) {
        throw new InvalidError("Unable to find the user, please register");
    }
}export async function getNonce(walletAddress: string | string[]) {
    const user = await findUserByWallet(walletAddress);
    let nonce = user.nonce;
    if (!nonce) {
        // generate nonce
        // Generate a random nonce (a 16-byte random string in this case)
        nonce = "randonenonce" + walletAddress;
    }
    return nonce;
}

