import { useSelector } from "react-redux";
import DeleteAccount from "../core/user/deleteAccount"
import { useLocation } from "react-router-dom";


export default function MyProfile() {
    const {user} = useSelector((state)=>state.profile)
    const location = useLocation()
    const { Data } = (location.state !== null) ?(location.state):({})
    let User = {}
    User === null ?(User = {...Data}):(User = {...user})

  return (
    <div className="py-2">
        <h1 className="mb-14 mt-[-12px] text-lg mx-24 font-medium text-caribbeangreen-100 sm:mx-7 lg:text-2xl">
            My Profile
        </h1>
        <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-8">
            <div className="flex items-center gap-x-4">
                <img
                    src={User?.image}
                    alt={`profile-${User?.firstName}`}
                    className="aspect-square w-[78px] rounded-full object-cover"
                />
                <div className="space-y-1">
                    <p className="text-lg font-semibold text-richblack-5">
                        {User?.firstName + " " + User?.lastName}
                    </p>
                    <p className="text-sm text-richblack-300">{User?.email}</p>
                </div>
            </div>
        </div>
        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
            <div className="flex w-full items-center justify-between">
                <p className="text-lg font-semibold text-richblack-5">Portfolio</p>
            </div>
            <p
                className={`${
                    User?.tasksAssigned?.count
                    ? "text-richblack-5"
                    : "text-richblack-200"
                } text-sm font-medium`}
                >
                    Tasks Completed : {User?.tasksAssigned?.filter((item) => item.status === "Complete").length}
            </p>
        </div>
        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
            <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold text-richblack-5">
                Personal Details
            </p>

            </div>
            <div className="flex-col max-w-[500px] justify-between md:flex lg:flex ">
                <div className="flex flex-col gap-y-5">
                    <div>
                        <p className="mb-2 text-sm text-richblack-300">First Name</p>
                        <p className="text-sm font-medium text-richblack-5">
                            {User?.firstName}
                        </p>
                    </div>
                    <div>
                        <p className="mb-2 text-sm text-richblack-300">Email</p>
                        <p className="text-sm font-medium text-richblack-5">
                            {User?.email}
                        </p>
                    </div>

                </div>
                <div className="flex flex-col gap-y-5">
                    <div>
                        <p className="mb-2 text-sm text-richblack-300">Last Name</p>
                        <p className="text-sm font-medium text-richblack-5">
                            {User?.lastName}
                        </p>
                    </div>
                    <div>
                        <p className="mb-2 text-sm text-richblack-300">Phone Number</p>
                        <p className="text-sm font-medium text-richblack-5">
                            {User?.additionalDetails?.contactNumber ?? "Add Contact Number"}
                        </p>
                    </div>
                </div>
            </div>  
        </div>
        <DeleteAccount></DeleteAccount>
        
    </div>
  )
}