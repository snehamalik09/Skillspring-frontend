import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isNavbarOpen:false,
}

const navbarSlice = createSlice({
    name:"navbarSlice",
    initialState,
    reducers:{
        toggleNavbar : (state) => {
            state.isNavbarOpen = !state.isNavbarOpen
        }
    }
});

export const {toggleNavbar} = navbarSlice.actions;
export default navbarSlice.reducer;