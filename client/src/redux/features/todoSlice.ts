import { createSlice } from "@reduxjs/toolkit";

type Ttodos = {
  id: string;
  title: string;
  description: string;
  priority: string;
  isCompleted?: boolean;
};

type TinitialState = {
  todos: Ttodos[];
};

const initialState: TinitialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({ ...action.payload, isCompleted: false });
    },
    updateTodo: (state, action) => {
      const { id, title, description, priority } = action.payload;
      const existingTodo = state.todos.find((item) => item.id === id);
      if (existingTodo) {
        existingTodo.title = title;
        existingTodo.description = description;
        existingTodo.priority = priority;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      const task = state.todos.find((item) => item.id === action.payload);
      task!.isCompleted = !task?.isCompleted;
    },
  },
});

export const { addTodo, deleteTodo, toggleComplete, updateTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
