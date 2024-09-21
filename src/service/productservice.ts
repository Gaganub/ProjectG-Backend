import { Product } from "../types";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export async function createProduct(product: Product) {
    // Create a new product
    const createdProduct = await prisma.product.create({
        data: product,
    });
    console.log(`Created product ${product}`);
    return createdProduct;
}

export async function findProductById(productId: number) {
    let product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    });
    return product;
}

export async function getAllProducts() {
    const products = await prisma.product.findMany();
    return products;
}