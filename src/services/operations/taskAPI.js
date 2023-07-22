import { apiConnector } from "../apiconnector"
import { taskAPI } from "../apis"
import { toast } from "react-hot-toast"
import { setTaskDetails, setTasks,setTasksList } from "../../slices/tasks"


export const getTasks = async (token,dispatch) => {
    let result =[]
    try {
    
      const response = await apiConnector("GET", taskAPI.GET_TASKS_LIST_API, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log(`response.......`, response)
      if (!response.data.success) {
        throw new Error(response.data.error);
      }
      console.log(`getlist.....` ,response.data.data)
      result= response.data.data;
      dispatch(setTasksList(response.data.data))

    } catch (error) {
      console.log(error);
      return [];
    }
    return result
  };


export function createTask({Title,Description,allocatedUser_ids,dueDate} ,token) {
    return async() => {
        console.log(`Bearer ${token}`)
        const toastId = toast.loading("Loading...")
        try {
            const res = await apiConnector("POST",taskAPI.CREATE_TASK_API,{Title,Description,allocatedUser_ids,dueDate,status:"Pending"},{
                Authorization: `Bearer ${token}`,
                })

            console.log("GET_USER_LIST_API RESPONSE............", res)

            if (!res.data.success) {
            throw new Error(res.data.message)
            }
            toast.success("Task Created Successfully")

        } catch (error) {
            console.log(error)
            toast.error("Task Creation Failed")
        }
        toast.dismiss(toastId)
    }
}


export const getusersTask =async(token,dispatch)=>{
    let result =[]

    try {
        console.log(`Bearer ${token}`)
        console.log(taskAPI.GET_TASKS_LIST_API)
        const response = await apiConnector("GET",taskAPI.GET_TASK_API,null,{
            Authorization: `Bearer ${token}`,
          })
        console.log("get tasks API response ..........."  ,response)

        if(!response.data.success){
            throw new Error(response.data.error) 
        }
        dispatch(setTasks(response.data.data))
        result = response.data.data

    } catch (error) {
        console.log(error)
    }
    return result
}

export const changeState = async(dispatch,data,token,navigate) => {
    const toastId = toast.loading("...loading")
    try {
        const res = await apiConnector("PUT",taskAPI.CHANGE_STATE_API,data,{
            Authorization: `Bearer ${token}`,
        })

        console.log(`changeState api res......`, res)

        if(!res.data.success){
            throw new Error(res.data.error) 
        }
        dispatch(setTaskDetails(res.data.data))

        toast.success("Status Updated Successfully")
        navigate(-1)

    } catch (error) {
        console.error(error)
        toast.error("Updation Failed" )
    }
    toast.dismiss(toastId)
}

export function deleteTask(token,taskId) {
    return async() => {
        try {
            const res = await apiConnector("DELETE",taskAPI.DELETE_TASK_API,{taskId},{
                Authorization: `Bearer ${token}`,
                })
            console.log(res)
            if(!res.data.success){
                throw new Error(res.data.error) 
            }

        } catch (error) {
            toast.error("Delete Unsuccessful")
        }
    }}


