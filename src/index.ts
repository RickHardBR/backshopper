import { Request, Response, NextFunction } from 'express'

import { app } from './server'

import 'express-async-errors'

import { userRouter } from './routes/userRoutes'

import { CustomError } from './errors/CustomError'

import { productsRouter } from './routes/productRoutes'

import { purchaseRouter } from './routes/purchaseRoutes'

app.use('/user', userRouter)
app.use('/purchase', purchaseRouter)
app.use('/products', productsRouter)

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  return error instanceof CustomError
    ? res.status(error.statusCode).send(error.message)
    : res.status(500).send(error.message || error.sqlMessage)
})
