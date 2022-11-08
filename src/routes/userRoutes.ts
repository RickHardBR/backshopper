import { Router } from 'express'

import { UserController } from '../modules/user/UserController'

export const userRouter = Router()

const userController = new UserController()

userRouter.post('/singUp', userController.create)
