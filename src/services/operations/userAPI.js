import { apiConnector } from "../apiconnector"
import { userAPI } from "../apis"
import { toast } from "react-hot-toast"
import { setToken } from "../../slices/authorisation"
import { setUser, setUserlist } from "../../slices/profile"


export function deleteProfile(token,userId ,navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector("DELETE", userAPI.DELETE_ACCOUNT_API, {userId}, {
            Authorization: `Bearer ${token}`,
            })
            console.log("DELETE_PROFILE_API API RESPONSE............", response)
    
            if (!response.data.success) {
            throw new Error(response.data.message)
            }
            toast.success("Profile Deleted Successfully")
            if(!userId){
                dispatch(logout(navigate))
            }
        } catch (error) {
            console.log("DELETE_PROFILE_API API ERROR............", error)
            toast.error("Could Not Delete Profile")
        }
        toast.dismiss(toastId)
        }
  }

export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
  }

export function getUserlist(token) {
    return async(dispatch) => {
        try {
            const res = await apiConnector("GET",userAPI.GET_USER_LIST_API,null,{
                Authorization: `Bearer ${token}`,
                })

            console.log("GET_USER_LIST_API RESPONSE............", res)

            if (!res.data.success) {
                throw new Error(res.data.message)
            }
            dispatch(setUserlist(res.data.data))
        } catch (error) {
            console.log(error)
        }

    }
}