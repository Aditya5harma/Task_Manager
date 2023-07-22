import { combineReducers } from "redux";
import authReducer from '../slices/authorisation'
import  profileReducer  from "../slices/profile";
import tasksReducer from "../slices/tasks"


export const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    tasks:tasksReducer

})
export default rootReducer