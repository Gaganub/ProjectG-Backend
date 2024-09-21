import { User, UserType } from "../types";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid');

const generateNonce = () => {
    const uuid = uuidv4();
    return uuid.replace(/-/g, '').slice(0, 16);
}

export async function createUser(user: User) {
    // Create a new user
    const createdUser = await prisma.user.create({
        data: user,
    });
    console.log(`Created user ${createdUser.name}`);
    return createdUser;
}

export async function findUserByWallet(walletAddress: string) {
    let user = await prisma.user.findUnique({
        where: {
            walletAddress: walletAddress
        }
    });
    if (!user) {
        const newUser = {
            walletAddress: walletAddress,
            nonce: generateNonce(),
            name: walletAddress,
            userType: UserType.CUSTOMER
        }
        user = await createUser(newUser);
    }
    return user;
}

export async function getAllUsers() {
    const users = await prisma.user.findMany();
    return users;
}
