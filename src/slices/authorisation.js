import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
    reducers: {
    setToken: (state, value) => {
      console.log(`token.........`,value.payload)
      localStorage.setItem('token', value.payload)
      state.token = value.payload;
    }

  }
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
