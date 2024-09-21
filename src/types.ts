import { Request } from 'express';

export interface AuthRequest extends Request {
    user: string
}

export interface User {
    walletAddress: string;
    name: string;
    nonce: string;
    userType: UserType;
}

export enum UserType {
    SUPPLIER = 'SUPPLIER',
    CUSTOMER = 'CUSTOMER',
    SHIPMENT_PROVIDER = 'SHIPMENT_PROVIDER'
}

export interface Product {
    name: string;
    price: number;
    description?: string;
    productOrders: OrderProduct[];
}

export interface OrderProduct {
    orderId: number;
    productId: number;
    quantity: number;
    product?: Product;
}

export interface Order {
    supplierId: number;
    customerId: number;
    shipmentProviderId: number;
    products: OrderProduct[];
    shippedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    supplier: User;
    customer: User;
    shipmentProvider: User;
}
