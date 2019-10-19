import { Router } from 'express'

import { tasksRouter } from './api/tasks'

export const apiRouter = new Router()

apiRouter.use('/tasks', tasksRouter)
