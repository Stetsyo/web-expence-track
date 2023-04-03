import {createSlice} from "@reduxjs/toolkit";

const localSlice = createSlice({
    name: "local",
    initialState: {
        isLoggedIn: localStorage.getItem("isLoggedIn"),
        userID: localStorage.getItem("userId"),
    },
    reducers: {
        setLocalSigned: (state,action) => {
            state.isLoggedIn = action.payload.isLog;
            state.userID = action.payload.id;
            localStorage.setItem('isLoggedIn', action.payload.isLog)
            localStorage.setItem('userId', action.payload.id);
        }
    }
})

export const {setLocalSigned} = localSlice.actions;
export default localSlice.reducer;