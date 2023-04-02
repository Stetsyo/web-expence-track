import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    popUpGoogleSignIn,
    createUserDocument,
    userSignOut,
    signInByPass,
    authByEmailAndPassword
} from "../../firebase/firebase";
import {getDoc} from "firebase/firestore";

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
    async ({password, email}) => {
        const {user} = await signInByPass(password, email);
        const userDocRef = await createUserDocument(user);
        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists()) {
            return userSnapshot.data();
        }
    }
);
export const signUpPassUser = createAsyncThunk(
    'user/SingUpPassUser',
    async ({password, email, displayName}) => {
        const {user} = await authByEmailAndPassword(password, email);
        console.log(user.uid)
        const userDocRef = await createUserDocument(user, {displayName})
        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists()) {
            return userSnapshot.data();
        }
    }
);

export const signOut = createAsyncThunk(
    'user/SignOut',
    async () => {
        await userSignOut();
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: {
            createdAt:"1680384949525",
            displayName:"Stetsyo",
            email:"ihorstetsky618@gmail.com",
            id: "2132112312312"
        },
        isUserLogined: false,
        statusLogPopUp: "idle",
        errorLogPopUp: null
    },
    reducers: {
        setLocalSigned: (state,action) => {
            console.log(action.payload)
            localStorage.setItem('isLoggedIn', action.payload.isLog)
            localStorage.setItem('userId', action.payload.id);
        }
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
            .addCase(signOut.fulfilled, (state, _, dispatch) => {
                state.statusLogPopUp = 'succeeded';
                state.currentUser = null;
                state.isUserLogined = false;
                dispatch(setLocalSigned(false))
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

export const {setLocalSigned} = userSlice.actions;
export default userSlice.reducer;
