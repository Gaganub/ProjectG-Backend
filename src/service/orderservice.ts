import { Order } from "../types";
import { InvalidError } from "../utils/errors";
import { findUserById } from "./userservice";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export async function createOrder(order: Order) {
    const supplierUser = await findUserById(order.supplierId);
    const customerUser = await findUserById(order.customerId);
    const shipmentProviderUser = await findUserById(order.shipmentProviderId);
    if (!(supplierUser && customerUser && shipmentProviderUser)) {
        const supplierMsg = supplierUser ? '': 'Supplier User Id:' + order.supplierId;
        const customerMsg = customerUser ? '': 'Customer User Id:' + order.customerId;
        const shipmentProviderMsg = shipmentProviderUser ? '': 'Shipment Provider User Id:' + order.shipmentProviderId;
        throw new InvalidError(`Missing users ${supplierMsg} ${customerMsg} ${shipmentProviderMsg}`);
    }
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
                quantity: product.quantity,
                product: {
                    create: {
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
            products: {
                include: {
                    product: true
                }
            }
        }
    });
    console.log(`Created order ${createdOrder}`);
    return createdOrder;
}

export async function findOrderById(orderId: number) {
    let order = await prisma.order.findUnique({
        where: {
            id: orderId
        },
        include: {
            supplier: true,
            customer: true,
            shipmentProvider: true,
            products: {
                include: {
                    product: true
                }
            }
        }
    });
    return order;
}

export async function getAllOrders() {
    const order = await prisma.order.findMany({
        include: {
            supplier: true,
            customer: true,
            shipmentProvider: true,
            products: {
                include: {
                    product: true
                }
            }
        }
    });
    return order;
}