import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    userlist: [],
    userDetails:{}
};

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
        },
        setUserlist(state, value){
            state.userlist = value.payload;

        },
        setUserDetails(state,value){
            state.userDetails = value.payload;
        }
    },
});

export const {setUser , setUserlist,setUserDetails} = profileSlice.actions;
export default profileSlice.reducer;