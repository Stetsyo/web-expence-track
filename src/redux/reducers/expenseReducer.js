// expenseReducer.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {addFirebaseExpense, getExpenses} from "../../firebase/firebase";
export const fetchExpenses = createAsyncThunk(
    'expenses/fetchExpenses',
    async (userId) => {
        const expenses = await getExpenses(userId);
        return expenses;
    }
);

export const addExpense = createAsyncThunk(
    'expenses/addExpense',
    async (newObject) => {
        const newExp = await addFirebaseExpense(newObject);
        return newExp;
    }
);

const expenseSlice = createSlice({
    name: 'expenses',
    initialState: {
        initialAmount: 500,
        expenses: [],
        statusAdd: 'idle',
        errorAdd: null,
        statusFetch: 'idle',
        errorFetch: null,
    },
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(addExpense.pending, state => {
                state.statusAdd = 'loading';
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.statusAdd = 'succeeded';
                state.expenses.push(action.payload);
                state.initialAmount -= action.payload.price;
            })
            .addCase(addExpense.rejected, (state, action) => {
                console.log(action)
                state.statusAdd = 'failed';
                state.errorAdd = action.error.message;
            })
            .addCase(fetchExpenses.pending, state => {
                state.statusFetch = 'loading';
            })
            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.statusFetch = 'succeeded';
                for (let exp of Object.keys(action.payload)) {
                    if (!state.expenses.some(el => el.id === action.payload[exp].id)) {
                        state.expenses.push(action.payload[exp]);
                        state.initialAmount -= action.payload[exp].price;
                    };
                };
            })
            .addCase(fetchExpenses.rejected, (state, action) => {
                state.statusFetch = 'failed';
                state.errorFetch = action.error.message;
            });
    },
});
export default expenseSlice.reducer;
