import {createSlice, createAsyncThunk, current} from '@reduxjs/toolkit';
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
    async (newObject, thunkAPI) => {
        const newExp = await addFirebaseExpense(newObject);
        thunkAPI.dispatch(getCategories())
        return newExp;
    }
);

const expenseSlice = createSlice({
    name: 'expenses',
    initialState: {
        initialAmount: 500,
        expenses: [],
        categories: [],
        categoriesRepeat: [],
        statusAdd: 'idle',
        errorAdd: null,
        statusFetch: 'idle',
        errorFetch: null,
    },
    reducers: {
        getCategories: (state) => {
            state.categories = current(state.expenses).map(exp => exp.category);

            for (let category of state.categories) {
                const includedCategory = state.categoriesRepeat.find(dataField => dataField.name === category);
                if (includedCategory) {
                    const updatedData = state.categoriesRepeat.map(dataField => {
                        if (dataField.name === category) {
                          return {...dataField, value: dataField.value + 1};
                        }
                        return dataField;
                      });
                      state.categoriesRepeat = updatedData;
                } else if (includedCategory === undefined) {
                    state.categoriesRepeat.push({name: category, value: 1})
                }
            }
        },
        getPercentage: (state) => {
            const valueAmount = state.categoriesRepeat.reduce((sum, val) => sum +=val.value, 0);
            for (let category of state.categoriesRepeat) {
                category.percentage = Math.round((100*category.value)/valueAmount)
            }
        }
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
export const {getCategories} = expenseSlice.actions;
export default expenseSlice.reducer;
