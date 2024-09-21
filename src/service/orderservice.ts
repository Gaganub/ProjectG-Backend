import { Order } from "../types";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export async function createOrder(order: Order) {
    // Create a new order
    const data = {
        supplierId: order.supplierId,
        customerId: order.customerId,
        shipmentProviderId: order.shipmentProviderId,
        shippedAt: order.shippedAt,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        products: {
            create: order.products.map(product => ({
                productId: product.id,
                quantity: product.quantity,
                product: {
                    create: {
                        id: product.product?.id,
                        name: product.product?.name,
                        price: product.product?.price,
                        description: product.product?.description
                    }
                }
            }))
        }
    };
    const createdOrder = await prisma.order.create({
        data: data,
        include: {
            products: true,
        }
    });
    console.log(`Created order ${createdOrder}`);
    return createdOrder;
}

export async function findOrderById(orderId: string) {
    let order = await prisma.order.findUnique({
        where: {
            id: orderId
        }
    });
    return order;
}

export async function getAllOrders() {
    const order = await prisma.order.findMany();
    return order;
}