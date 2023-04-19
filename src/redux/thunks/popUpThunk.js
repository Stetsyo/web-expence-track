import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    authByEmailAndPassword,
    createUserDocument,
    popUpGoogleSignIn,
    signInByPass,
    userSignOut
} from "../../firebase/firebase";
import {getDoc} from "firebase/firestore";
import {setLocalSigned} from "../reducers/localReducer";

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