import { z } from "zod";
import { t } from "../trpc";
import Task from "../models/task.model";
import mongoose, { Mongoose } from "mongoose";

interface Task {
  _id?: string;
  title: string;
  completed: boolean;
}

export const todoRouter = t.router({
  allTask: t.procedure.query(async () => {
    const tasks = await Task.find();
    return tasks;
  }),

  addTask: t.procedure
    .input(
      z.object({
        title: z.string().min(1, "Task is required"),
        completed: z.boolean().default(false),
        description: z.string().min(1, "Description is required"),
      })
    )
    .mutation(async ({ input }) => {
      const newTask = new Task({
        title: input.title,
        completed: input.completed,
        description: input.description,
      });
      const saveTask = await newTask.save();

      return {
        success: true,
        message: "New task added successfully !!",
        saveTask,
      };
      // tasks.push({ title: input.title, completed: false });
      // return tasks;
    }),
  deleteTask: t.procedure
    .input(z.object({ _id: z.string() }))
    .mutation(async ({ input }) => {
      try {
        // const taskId = new mongoose.Types.ObjectId(input._id);
        if (!mongoose.Types.ObjectId.isValid(input._id)) {
          throw new Error("Invalid task id");
        }
        const deletedTask = await Task.findByIdAndDelete(input._id);

        if (!deletedTask) {
          throw new Error("Task is not found");
        }

        return {
          success: true,
          message: "Task is deleted successfully",
          deletedTask,
        };
      } catch (error: any) {
        console.error("Failed in the delete the task", error);
        throw new Error("Failed to delete task: " + error.message);
      }
    }),

  toggleTask: t.procedure
    .input(z.object({ _id: z.string(), completed: z.boolean() }))
    .mutation(async ({ input }) => {
      const taskId = new mongoose.Types.ObjectId(input._id);
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        {
          completed: input.completed,
        },
        { new: true }
      );

      return {
        success: true,
        message: "Task is updated Successfully !!",
        updatedTask,
      };
    }),
});
