import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface TaskProps {
  _id: string;
  title: string;
  completed: boolean;
}

interface TaskState {
  tasks: TaskProps[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// This is a thunk that will be used to manually trigger the fetch
// The actual data fetching will be done in the component using tRPC
export const fetchAllTask = createAsyncThunk(
  "tasks/fetchTasks",
  async (tasks: TaskProps[], { rejectWithValue }) => {
    try {
      return tasks;
    } catch (error) {
      return rejectWithValue("Failed to load tasks");
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    getAllTask: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<TaskProps>) => {
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
  extraReducers: (builder) => {
    builder.addCase(fetchAllTask.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllTask.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAllTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { addTask, getAllTask, removeTask, toggleTask } =
  taskSlice.actions;
export default taskSlice.reducer;
