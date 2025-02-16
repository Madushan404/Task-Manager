import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskType } from "../types/task";

interface TasksState {
  tasks: TaskType[];
}

const initialState: TasksState = {
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskType>) => {
      state.tasks.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    editTask: (state, action: PayloadAction<TaskType>) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateStatus: (state, action: PayloadAction<{ id: string; status: "completed" | "pending" }>) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? { ...task, status: action.payload.status } : task
      );
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
});

export const { addTask, editTask, deleteTask, updateStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
