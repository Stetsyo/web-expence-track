import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    popUpGoogleSignIn,
    createUserDocument,
    userSignOut,
    signInByPass,
    authByEmailAndPassword
} from "../../firebase/firebase";
import {getDoc} from "firebase/firestore";
import {setLocalSigned} from "./localReducer";

export const logPopUpUser = createAsyncThunk(
    'user/LogPopUpUser',
    async (_, thunkAPI) => {
        const {user} = await popUpGoogleSignIn();
        const userDocRef = await createUserDocument(user);
        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists()) {
            thunkAPI.dispatch(setLocalSigned({isLog: true, id: userDocRef.id}))
            return userSnapshot.data();
        }
    }
);
export const logPassUser = createAsyncThunk(
    'user/LogPassUser',
    async ({password, email}, thunkAPI) => {
        const {user} = await signInByPass(password, email);
        const userDocRef = await createUserDocument(user);
        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists()) {
            thunkAPI.dispatch(setLocalSigned({isLog: true, id: userDocRef.id}))
            return userSnapshot.data();
        }
    }
);
export const signUpPassUser = createAsyncThunk(
    'user/SingUpPassUser',
    async ({password, email, displayName}, thunkAPI) => {
        const {user} = await authByEmailAndPassword(password, email);
        const userDocRef = await createUserDocument(user, {displayName})
        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists()) {
            thunkAPI.dispatch(setLocalSigned({isLog: true, id: userDocRef.id}))
            return userSnapshot.data();
        }
    }
);

export const signOut = createAsyncThunk(
    'user/SignOut',
    async (_, thunkAPI) => {
        try {
            await userSignOut();
        } catch (e) {
            console.log(e.message)
        } finally {
            thunkAPI.dispatch(setLocalSigned({isLog: false, id: null}))
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: {
            createdAt:"1680384949525",
            displayName:"Stetsyo",
            email:"ihorstetsky618@gmail.com",
            id: "21cr2r4324f342c"
        },
        isUserLogined: false,
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
