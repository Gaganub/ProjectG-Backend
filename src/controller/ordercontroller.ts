import { Request, NextFunction, Response } from "express";
import { Order } from "../types";
import { InvalidError } from "../utils/errors";
import { createOrder, findOrderById, getAllOrders } from "../service/orderservice";

export async function post(req: Request, res: Response, next: NextFunction) {
    try {
        const order = req.body as Order;
        const valid = order.customerId && order.supplierId;
        if (!valid) {
            throw new InvalidError('Incorrect order input missing name');
        }
        const value = await createOrder(order);
        res.status(201).json(value);
    } catch (e: any) {
        next(e);
    }
}

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const orders = await getAllOrders();
        res.status(200).json(orders);
    } catch (e: any) {
        next(e);
    }
}

export async function getOrder(req: Request, res: Response, next: NextFunction) {
    try {
        const orderId = req.params.id
        const order = await findOrderById(orderId);
        res.status(200).json(order);
    } catch (e: any) {
        next(e);
    }
}
