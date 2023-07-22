import React from 'react';
import DeleteAccount from './deleteAccount';
import { useSelector } from 'react-redux';


const AUser = () => {
    const {userDetails} = useSelector((state)=> state.profile)



    return (
        <div>
             <div className="py-2">
        <h1 className="mb-14 mt-[-12px] text-lg mx-24 font-medium text-caribbeangreen-100 sm:mx-7 lg:text-2xl">
            My Profile
        </h1>
        <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-8">
            <div className="flex items-center gap-x-4">
                <img
                    src={userDetails?.image}
                    alt={`profile-${userDetails?.firstName}`}
                    className="aspect-square w-[78px] rounded-full object-cover"
                />
                <div className="space-y-1">
                    <p className="text-lg font-semibold text-richblack-5">
                        {userDetails?.firstName + " " + userDetails?.lastName}
                    </p>
                    <p className="text-sm text-richblack-300">{userDetails?.email}</p>
                </div>
            </div>
        </div>
        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
            <div className="flex w-full items-center justify-between">
                <p className="text-lg font-semibold text-richblack-5">Portfolio</p>
            </div>
            <p
                className={`${
                    userDetails?.tasksAssigned?.count
                    ? "text-richblack-5"
                    : "text-richblack-200"
                } text-sm font-medium`}
                >
                    Tasks Completed : {userDetails?.tasksAssigned?.filter((item) => item.status === "Complete").length}
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
                            {userDetails?.firstName}
                        </p>
                    </div>
                    <div>
                        <p className="mb-2 text-sm text-richblack-300">Email</p>
                        <p className="text-sm font-medium text-richblack-5">
                            {userDetails?.email}
                        </p>
                    </div>

                </div>
                <div className="flex flex-col gap-y-5">
                    <div>
                        <p className="mb-2 text-sm text-richblack-300">Last Name</p>
                        <p className="text-sm font-medium text-richblack-5">
                            {userDetails?.lastName}
                        </p>
                    </div>
                    <div>
                        <p className="mb-2 text-sm text-richblack-300">Phone Number</p>
                        <p className="text-sm font-medium text-richblack-5">
                            {userDetails?.additionalDetails?.contactNumber ?? "Add Contact Number"}
                        </p>
                    </div>
                </div>
            </div>  
        </div>
        <DeleteAccount userId ={userDetails._id}></DeleteAccount>
    </div>
            
        </div>
    );
};

export default AUser;