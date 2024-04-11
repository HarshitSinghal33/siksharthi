import { createSlice } from "@reduxjs/toolkit";

const userBookData = createSlice({
    name: 'userBookData',
    initialState: { docPageIndex: 1, docID: 1 },
    reducers: {
        setDocPageIndex: (state, action) => {
            state.docPageIndex = action.payload;
        },
        setDocID: (state, action) => {
            state.docID = action.payload
        }
    }
})

export const { setDocPageIndex, setDocID } = userBookData.actions;
export const docPageIndex = (state) => state.userBookData.docPageIndex
export const docID = (state) => state.userBookData.docID
export default userBookData.reducer;