import { createSlice } from "@reduxjs/toolkit";

// Initial state for authentication
const initialState = {
    user: null, // Stores user details when logged in
    isAuthenticated: false // Boolean flag to check if user is authenticated
};




// Creating an authentication slice using createSlice
const authSlice = createSlice({
    name: "authSlice", // Unique name for the slice
    initialState, // Initial state defined above
    reducers: {
        // Action to log in the user
        userLoggedIn: (state, action) => {
            state.user = action.payload.user; // Storing user details
            state.isAuthenticated = true; // Setting authentication status to true
        },
        // Action to log out the user
        userLoggedOut: (state) => {
            state.user = null; // Clearing user details
            state.isAuthenticated = false; // Setting authentication status to false
        }
    },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
