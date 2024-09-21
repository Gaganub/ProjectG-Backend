import { Request, NextFunction, Response } from "express";
import { Product } from "../types";
import { InvalidError } from "../utils/errors";
import { createProduct, findProductById, getAllProducts } from "../service/productservice";

function validateProducts(products: Product[]) {
    if (!Array.isArray(products) || products.length === 0) {
        throw new InvalidError('Product input must be a non-empty array');
    }

    products.forEach((product, index) => {
        const valid = product.name;
        if (!valid) {
            throw new InvalidError(`Incorrect product input at index ${index}: missing name`);
        }
    });
}

export async function post(req: Request, res: Response, next: NextFunction) {
    try {
        const products = req.body as Product[];
        validateProducts(products)
        const value = await createProduct(products);
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
