import React from "react"; 
import { useDispatch, useSelector } from "react-redux"; 
import { changeState } from "../../../services/operations/taskAPI";
import { useNavigate } from "react-router-dom";
import { deleteTask } from "../../../services/operations/taskAPI";



const ATask = () => {
    const {taskDetails} = useSelector((state)=> state.tasks)
    const {token} = useSelector((state) => state.auth)
    const dispatch= useDispatch()
    const navigate = useNavigate()

    const stateHandler = () =>{
        changeState(dispatch,{
            newStatus:taskDetails.status==="Pending" ? ("Ongoing" ):("Complete"),
             taskId:taskDetails._id
        },token,navigate)
    }
    const deletetaskHandler = () =>{
        dispatch(deleteTask(token,taskDetails._id))
    }

    
    return (
        <div>
            <div className="py-2">
                <h1 className="mb-8 mx-24 text-lg mt-[-14px] font-medium text-caribbeangreen-100 lg:mx-4 lg:text-2xl">
                    Task Details
                </h1>
                <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 px-12">
                    <div className="flex items-center justify-between ">
                        <p className="text-lg font-semibold text-richblack-5">
                            {taskDetails?.Title ?? `no title`}
                        </p>

                    
                       <button onClick={stateHandler}>
                            <p className={`p-3 px-6 rounded-xl${taskDetails.status === "Complete" ?("bg-[#34b42e] text-white border-[1px] border-[#1da816]"):(null)}
                                            ${taskDetails.status === "Pending" ?("bg-red-500 text-white border-[1px] border-[#dc1515]"):(null)}
                                            ${taskDetails.status === "Ongoing" ?("bg-[#367CFE] text-white border-[1px] border-[#4c3ffc]"):(null)}`
                                        }>
                                {taskDetails?.status ?? `no status`}
                            </p>
                       </button>
                    </div>
                </div>
                <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                    <div className="flex w-full items-center justify-between">
                        <p className="text-lg font-semibold text-richblack-5">Description</p>
                    </div>
                    <p className="text-richblack-100 text-sm font-medium">
                        {taskDetails?.Description ?? `no description`}
                    </p>
                </div>
                <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                    <div className="flex w-full items-center justify-between">
                    <p className="text-lg font-semibold text-richblack-5">
                        Details
                    </p>

                    </div>
                    <div className="flex max-w-[500px] justify-between">
                        <div className="flex flex-col gap-y-5">
                            <div>
                                <p className="mb-2 text-sm text-richblack-300">Deadline</p>
                                <p className="text-sm font-medium text-richblack-5">
                                    {taskDetails?.dueDate?.toString().slice(0, 10) ?? `no dead line`}
                                </p>
                            </div>
                            <div>
                                <p className="mb-2 text-sm text-richblack-300">Remaining Days</p>
                                <p className="text-sm font-medium text-richblack-5">
                                    {(taskDetails?.dueDate-Date.now())/24*60*60*1000} Days
                                </p>
                            </div>

                        </div>
                        <div className="flex flex-col gap-y-5">
                            <div>
                            <p className="mb-2 text-sm text-richblack-300">Create On</p>
                                <p className="text-sm font-medium text-richblack-5">
                                    {taskDetails?.createdAt ?? `no creation date`}
                                </p>
                            </div>
                            <div>
                                <p className="mb-2 text-sm text-richblack-300">Other Participants</p>
                                <p className="text-sm font-medium text-richblack-5">
                                    {taskDetails?.allocatedUser.map((A,index)=>(<h3 key={index}>{`${A.firstName} ${A.lastName}`}<br/></h3>)) ?? `no description`}
                                </p>
                            </div>
                        </div>
                        <button className="p-3 px-6 bg-[#353cff] border-2 border-[#242ac5]"
                                onClick={deletetaskHandler}
                        >Delete Task</button>
                    </div>  
                </div>
            </div>
        </div>
    );
};

export default ATask;



{/* <div className="space-y-1">
<p className="text-lg font-semibold text-richblack-5">
    {user?.firstName + " " + user?.lastName}
</p>
<p className="text-sm text-richblack-300">{user?.email}</p>
</div> */}