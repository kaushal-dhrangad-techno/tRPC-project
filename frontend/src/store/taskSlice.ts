import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    getAllTask: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      if (action.payload._id.length === 24) {
        state.tasks.push(action.payload);
      }
    },

    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t._id !== action.payload);
    },
  },
});

export const { addTask, getAllTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
