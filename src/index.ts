import { app } from "./server";

import { userRouter } from './routes/userRoutes';

import { CustomError } from './errors/CustomError';

import { produtcsRouter } from './routes/productRoutes';

import { purchaseRouter } from './routes/purchaseRoutes';

import {
  Request,
  Response,
  NextFunction
} from "express";

import "express-async-errors";

app.use('/user', userRouter);
app.use('/purchase', purchaseRouter);
app.use('/products', produtcsRouter);


app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    return error instanceof CustomError 
  ?
    res.status(error.statusCode).send(error.message)
  :
    res.status(500).send(error.message || error.sqlMessage)
});