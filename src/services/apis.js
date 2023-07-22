// import dotenv from 'dotenv';
// dotenv.config();


const BASE_URL = "http://localhost:4000/api/v1"
//process.env.REACT_APP_BASE_URL


// CATAGORIES API
export const authAPI = {
    LOGIN_API: BASE_URL + "/auth/login",
    SIGNUP_API: BASE_URL + "/auth/signup"
  }

export const contactUs = {
    CONTACT_US_API: BASE_URL + "/contact/contactUs"
}

export const taskAPI = {
    GET_TASKS_LIST_API: BASE_URL + "/tasks/getAllTasks",
    CREATE_TASK_API: BASE_URL + "/tasks/createTask",
    GET_TASK_API: BASE_URL + "/profile/getAssignedTasks",
    CHANGE_STATE_API: BASE_URL + "/tasks/editStatus",
    DELETE_TASK_API: BASE_URL + "/tasks/deleteTask"
}

export const userAPI = {
  DELETE_ACCOUNT_API: BASE_URL + "/profile/deleteAccount",
  GET_USER_LIST_API: BASE_URL + "/profile/getAllUsers"
}