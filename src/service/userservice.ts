import { User } from "../types/user";
import { InvalidError } from "../utils/errors";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export async function createUser(user: User) {
    // Create a new user
    const createdUser = await prisma.user.create({
        data: user,
    });
    console.log(`Created user ${createdUser.name}`);
    return createdUser;
}

export async function findUserByWallet(walletAddress: string | string[]) {
    const user = await prisma.user.findUnique({
        where: {
            walletAddress: walletAddress
        }
    });
    if (!user) {
        throw new InvalidError('Unable to find the user, please register');
    }
    return user;
}

export async function getAllUsers() {
    const users = await prisma.user.findMany();
    return users;
}
