import { Response, Request, NextFunction } from 'express';
import express from "express";
import bodyParser from 'body-parser';
import { rootRouter } from './routes/rootrouter';
import { InvalidError, NotFoundError, TokenExpiredError, UnauthorizedError } from './utils/errors';
import logger from './utils/logger';
import { userRouter } from './routes/userrouter';
import { productRouter } from './routes/productrouter';
import { orderRouter } from './routes/orderrouter';
import cors from 'cors';

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.options('*', cors());

app.use('/', rootRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);


// Middleware for global error hanlding
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode: number = 500;
    let errorMessage = err.message;
    switch (err.constructor) {
        case NotFoundError:
            statusCode = 404;
            break;
        case TokenExpiredError:
            statusCode = 498;
            break;
        case UnauthorizedError:
            statusCode = 401;
            break;
        case InvalidError:
            statusCode = 400;
            break;
        default:
            statusCode = 500;
            logger.error(err);
            errorMessage = 'Internal server error, please contact Administrator';
            break;
    }

    res.status(statusCode).json({
        error: errorMessage,
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`ProjectG app listening on port ${port}`);
});
