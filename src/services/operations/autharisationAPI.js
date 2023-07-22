import { apiConnector } from "../apiconnector"
import { authAPI } from "../apis"
import { toast } from "react-hot-toast"
import { setToken } from "../../slices/authorisation"
import { setUser } from "../../slices/profile"
import { setTasks } from "../../slices/tasks"
import { getUserlist } from "./userAPI"

export const Signup = async(signupData,navigate) =>{

    console.log(JSON.stringify(signupData))
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", authAPI.SIGNUP_API, signupData)

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Signup Successful")
      navigate("/login")

    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error(error)
      navigate("/signup")
    }
    toast.dismiss(toastId)
  }


  export function Login(logindata, navigate) {
    return async (dispatch) => {    const toastId = toast.loading("Loading...")
    try {
        const response= await apiConnector('POST',authAPI.LOGIN_API,logindata)
        console.log(`api response token.........`,response.token)

        if (!response.data.success) {
            throw new Error(response.data.message)
          }

        toast.success("Login Successful")

        dispatch(setToken(response.data.token))
        const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        dispatch(setUser({ ...response.data.user, image: userImage }))

        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user", JSON.stringify(response.data.user))

        dispatch(setTasks(response.data.user.tasksAssigned))

        console.log(`all the apis dispatched successfully`)

        navigate("/dashboard/profile")
        dispatch(getUserlist(response.data.token))

    } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error(error)
        navigate("/")
        
    }
    toast.dismiss(toastId)
}}


    


