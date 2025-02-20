import mongoose from "mongoose";
import { boolean } from "zod";

interface TaskProps {
    title: string
    status: boolean
}

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    completed: {
        type: boolean,
        require: true
    }
}, {
    timestamps: true
})

const Task = mongoose.model<TaskProps>("Task", taskSchema)

export default Task