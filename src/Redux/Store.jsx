import { configureStore } from "@reduxjs/toolkit";
import userBookData from "./Slice/userBookData";
import userAppData from "./Slice/userAppDataSlice"
import userAuthSlice from "./Slice/userAuthSlice";
export const store = configureStore({
    reducer : {
        userAppData: userAppData,
        userAuthSlice:userAuthSlice,
        userBookData: userBookData,
    }
})