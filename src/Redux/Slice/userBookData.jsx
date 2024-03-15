import { createSlice } from "@reduxjs/toolkit";

const userBookData = createSlice({
    name: 'userBookData',
    initialState: { page:0, doc:0 },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setDocID : (state,action)=> {
            state.doc = action.payload
        }
    }
})

export const { setPage, setDocID } = userBookData.actions;
export const currentReadingPage = (state) => state.userBookData.page
export const currentReadDoc = (state) => state.userBookData.doc
export default userBookData.reducer;