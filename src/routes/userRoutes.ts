import { Router } from 'express';

import { UserController } from '../modules/user/UserController';

import { CartUserController } from '../modules/cartUser/CartUserController';

export const userRouter = Router()

const userController = new UserController();

const cartUserController = new CartUserController();

userRouter.get('/cart/:userEmail', cartUserController.get)

userRouter.post('/singUp', userController.create)