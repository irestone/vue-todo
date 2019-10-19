import { model, Schema } from 'mongoose'

export const Task = model(
  'Task',
  new Schema(
    {
      text: String,
      isCompleted: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  )
)
