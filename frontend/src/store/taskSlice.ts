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

    toggleTask: (
      state,
      action: PayloadAction<{ _id: string; completed: boolean }>
    ) => {
      state.tasks = state.tasks.map((task) =>
        task._id === action.payload._id
          ? { ...task, completed: action.payload.completed }
          : task
      );
    },
  },
});

export const { addTask, getAllTask, removeTask, toggleTask } =
  taskSlice.actions;
export default taskSlice.reducer;
