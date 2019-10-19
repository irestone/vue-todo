import { Router } from 'express'
import _ from 'lodash'

import { Task } from '../../models/Task'

export const tasksRouter = new Router()

// =====================================
//  CREATE
// =====================================

tasksRouter.post('/', async (req, res) => {
  try {
    const newTask = new Task(req.body)
    const savedTask = await newTask.save()
    res.json(savedTask)
  } catch (error) {
    res.json({ error })
  }
})

// =====================================
//  READ
// =====================================

tasksRouter.get('/', async (req, res) => {
  try {
    const tasks = await Task.find()
    const mappedTasks = _.keyBy(tasks, '_id')
    res.json(mappedTasks)
  } catch (error) {
    res.json({ error })
  }
})

// =====================================
//  UPDATE
// =====================================

tasksRouter.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.json(updatedTask)
  } catch (error) {
    res.json({ error })
  }
})

// =====================================
//  DELETE
// =====================================

tasksRouter.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id)
    res.json({ _id: req.params.id })
  } catch (error) {
    res.json({ error })
  }
})
