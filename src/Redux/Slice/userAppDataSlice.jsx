import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkMode: false,
    language: 'english',
    bookFontSize: '21'
}

const userAppDataSlice = createSlice({
    name: 'userApp',
    initialState,
    reducers: {
        setDarkMode: (state,action) => {
            state.darkMode = action.payload
        },
        setLanguage: (state, action) => {
            state.language = action.payload
        },
        setBookFontSize: (state,action) => {
            state.bookFontSize = action.payload
        }
    }
})

export const { setDarkMode, setLanguage, setBookFontSize } = userAppDataSlice.actions
export const mode = (state) => state.userAppData.darkMode
export const lang = (state) => state.userAppData.language;
export const fSize = (state) => state.userAppData.bookFontSize;
export default userAppDataSlice.reducer