import { createSlice } from '@reduxjs/toolkit';
import {setLocalSigned} from "./localReducer";
import {logPassUser, signUpPassUser, signOut, logPopUpUser} from "../thunks/popUpThunk";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: {
            createdAt:"1680384949525",
            displayName:"Stetsyo",
            email:"ihorstetsky618@gmail.com",
            id: "21cr2r4324f342c"
        },
        isUserLogined: localStorage.getItem("isLoggedIn"),
        statusLogPopUp: "idle",
        errorLogPopUp: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(logPopUpUser.pending, state => {
                state.statusLogPopUp = 'loading';
            })
            .addCase(logPopUpUser.fulfilled, (state, action) => {
                state.statusLogPopUp = 'succeeded';
                state.currentUser = action.payload;
                state.isUserLogined = true;
            })
            .addCase(logPopUpUser.rejected, (state, action) => {
                state.statusLogPopUp = 'failed';
                state.errorLogPopUp = action.error.message;
            })
//----------------------------------------------------------------------------------------------------------------------
            .addCase(signOut.pending, state => {
                state.statusLogPopUp = 'loading';
            })
            .addCase(signOut.fulfilled, (state, _) => {
                state.statusLogPopUp = 'succeeded';
                state.currentUser = null;
                state.isUserLogined = false;
            })
            .addCase(signOut.rejected, (state, action) => {
                state.statusLogPopUp = 'failed';
                state.errorLogPopUp = action.error.message;
            })
//----------------------------------------------------------------------------------------------------------------------
            .addCase(logPassUser.pending, state => {
                state.statusLogPopUp = 'loading';
            })
            .addCase(logPassUser.fulfilled, (state, action, dispatch) => {
                state.statusLogPopUp = 'succeeded';
                state.currentUser = action.payload;
                state.isUserLogined = true;
                dispatch(setLocalSigned(true))
            })
            .addCase(logPassUser.rejected, (state, action) => {
                state.statusLogPopUp = 'failed';
                state.errorLogPopUp = action.error.message;
            })
//----------------------------------------------------------------------------------------------------------------------
            .addCase(signUpPassUser.pending, state => {
                state.statusLogPopUp = 'loading';
            })
            .addCase(signUpPassUser.fulfilled, (state, action, dispatch) => {
                state.statusLogPopUp = 'succeeded';
                state.currentUser = action.payload;
                state.isUserLogined = true;
                dispatch(setLocalSigned(true))
            })
            .addCase(signUpPassUser.rejected, (state, action) => {
                console.log(action)
                state.statusLogPopUp = 'failed';
                state.errorLogPopUp = action.error.message;
            });
    },
});

export default userSlice.reducer;
