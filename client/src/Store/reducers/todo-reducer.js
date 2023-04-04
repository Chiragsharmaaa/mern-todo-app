import { createSlice } from "@reduxjs/toolkit";

const TodoSlice = createSlice({
    name: "todo",
    initialState: { totalTodo: [], fetchTodo: false, initialTodo: [], userLoggedIn: false },
    reducers: {
        addTodos(state, action) {
            state.totalTodo = action.payload;
        },
        fetchTodos(state) {
            state.fetchTodo = !state.fetchTodo;
        },
        addInitial(state, action) {
            state.initialTodo = action.payload;
        },
        login(state) {
            state.userLoggedIn = true
        },
        logout(state) {
            state.userLoggedIn = false
        }

    },
});

export const TodoActions = TodoSlice.actions;
export default TodoSlice.reducer;
