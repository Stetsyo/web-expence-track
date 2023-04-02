import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './reducers/expenseReducer';
import userReducer from "./reducers/userReducer";

export const store = configureStore({
    reducer: {
        expenses: expenseReducer,
        user: userReducer,
    },
});