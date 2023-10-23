const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    userData: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload;
        },
        logout: (state) => {
            state.userData = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;