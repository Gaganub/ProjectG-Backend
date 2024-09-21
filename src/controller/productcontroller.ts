import { Request, NextFunction, Response } from "express";
import { Product } from "../types";
import { InvalidError } from "../utils/errors";
import { createProduct, findProductById, getAllProducts } from "../service/productservice";

export async function post(req: Request, res: Response, next: NextFunction) {
    try {
        const product = req.body as Product;
        const valid = product.name;
        if (!valid) {
            throw new InvalidError('Incorrect product input missing name');
        }
        const value = await createProduct(product);
        res.status(201).json(value);
    } catch (e: any) {
        next(e);
    }
}

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (e: any) {
        next(e);
    }
}

export async function getProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const productId = parseInt(req.params.id);
        const product = await findProductById(productId);
        res.status(200).json(product);
    } catch (e: any) {
        next(e);
    }
}
