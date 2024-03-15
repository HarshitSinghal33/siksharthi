import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithRedirect
} from "firebase/auth";
import { auth } from '../../../Firebase';
import { setDoc, doc } from 'firebase/firestore';
import { fireStoreDb } from '../../../Firebase';

const initiatlStates = {
    userUID: null,
    isLoading: false
}

export const signupAsync = createAsyncThunk('auth/signup', async ({ email, password }, { rejectWithValue }) => {
    try {
        const cred = await createUserWithEmailAndPassword(auth, email, password)
        const { uid } = cred.user
        const data = {
            bookMark: [],
            bookRead: []
        }
        const documentRef = doc(fireStoreDb, 'users', uid)
        await setDoc(documentRef, data)

        return uid
    } catch (error) {
        return rejectWithValue(error.code)
    }
});

export const loginAsync = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const { uid } = cred.user
        return uid
    } catch (error) {
        return rejectWithValue(error.code)
    }
});

export const changePasswordAsync = createAsyncThunk('auth/changePassword', async (email, { rejectWithValue }) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        return rejectWithValue(error.code)
    }
}
);

export const googleSignup = createAsyncThunk('auth/googleSignup', async (_,{rejectWithValue}) => {
    try {
        const googleAuthProvider = new GoogleAuthProvider
        return signInWithRedirect(auth, googleAuthProvider)
    } catch (error) {
        return rejectWithValue(error.code)
    }
})

export const logOutAsync = createAsyncThunk('auth/logout', async (_,{rejectWithValue}) => {
    try {
        await signOut(auth)
        setCurrentUser(null)
    } catch (error) {
        return rejectWithValue(error.code)
    }
})

const userAuthSlice = createSlice({
    name: 'auth',
    initialState: initiatlStates,
    reducers: {
        setCurrentUser: (state, action) => {
            state.userUID = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signupAsync.fulfilled, (state, action) => {
                state.userUID = action.payload;
                state.isLoading = false;
            })
            .addCase(signupAsync.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(loginAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.userUID = action.payload;
                state.isLoading = false;
            })
            .addCase(loginAsync.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(logOutAsync.fulfilled, (state) => {
                state.userUID = null;
                state.isLoading = false;
            })
            .addCase(logOutAsync.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(changePasswordAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changePasswordAsync.fulfilled, (state) => {
                state.userUID = null;
                state.isLoading = false;
            })
            .addCase(changePasswordAsync.rejected, (state) => {
                state.isLoading = false;
            })
    },
});

export const { setCurrentUser } = userAuthSlice.actions;
export const uid = (state) => state.userAuthSlice.userUID;
export const isLoading = (state) => state.userAuthSlice.isLoading;
export default userAuthSlice.reducer;