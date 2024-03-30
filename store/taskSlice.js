import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        status: action.payload.status || "Pending",
        assignee: action.payload.assignee || "",
        priority: action.payload.priority || "",
      };
      state.push(newTask);
    },
    removeTask: (state, action) => {
      const taskIndex = state.findIndex((task) => task.id === action.payload);
      state.splice(taskIndex, 1);
    },
    toggleTaskCompleted: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        if (task.completed) {
          task.endDate = new Date().toISOString();
        } else {
          task.endDate = null;
        }
      }
    },
    updateTask: (state, action) => {
      const { id, ...updatedTaskFields } = action.payload;
      const taskIndex = state.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state[taskIndex] = { ...state[taskIndex], ...updatedTaskFields };
      }
    },
  },
});

export const { addTask, removeTask, toggleTaskCompleted, updateTask } =
  taskSlice.actions;
export default taskSlice.reducer;

export const selectAllTasks = (state) => state.tasks;
