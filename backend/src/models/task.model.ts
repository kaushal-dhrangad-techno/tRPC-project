import mongoose from "mongoose";
import { z } from "zod";

interface TaskProps {
  title: string;
  status: boolean;
  description: string;
}

export const TaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  completed: z.boolean().default(false),
  description: z.string().min(1, "Description is required"),
});

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model<TaskProps>("Task", taskSchema);

export default Task;
