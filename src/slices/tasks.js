import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    tasks: [],
    taskList:[],
    taskDetails:{}
};

const tasksSlice = createSlice({
    name:"tasks",
    initialState: initialState,
    reducers: {
        setTasks(state, value) {
            state.tasks = value.payload;
        },
        setTasksList(state,value){
            state.taskList = value.payload
        },
        setTaskDetails(state,value){
            state.taskDetails = value.payload
        }
    },
});

export const {setTasks,setTasksList,setTaskDetails} = tasksSlice.actions;
export default tasksSlice.reducer;