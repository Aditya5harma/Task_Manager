import React from 'react';
import { Link } from 'react-router-dom';
import { setTaskDetails } from '../../../slices/tasks';
import { useDispatch } from 'react-redux';

const TaskListTamplate = (props) => {
    const { data} = props;
    const heading = props.heading
    const dispatch = useDispatch()

    console.log(data)

    return (
        <div  > 
            <h1 className=" mb-1 mx-24 mt-2 text-lg font-medium text-caribbeangreen-100 translate-y-[-1rem] lg:mx-5 lg:2xl">
                {heading}
            </h1>

            <div className='overflow-y-auto overflow-x-hidden h-[560px] lg:min-h-screen lg:overflow-y-hidden   '>
            <div className='flex invisible items-center justify-evenly h-24 border-y-2 border-richblack-900 bg-richblack-800  lg:visible lg:h-20 lg:border-y-1'>
                <h2 className='p-2 px-10 mr-20 font-bold text-richblack-50  bg-caribbeangreen-300 rounded-md border-[1px] border-caribbeangreen-400 lg:border-0'>
                    Title
                </h2>
                <h2 className='p-2 px-10 font-bold text-richblack-50 bg-caribbeangreen-300 rounded-md border-[1px] border-caribbeangreen-400'>
                    Status
                </h2>
                <h2 className='flex flex-col font-normal text-richblack-50 gap-2 border-caribbeangreen-400 lg:flex-row justify-center items-center lg:gap-6 lg:font-bold'>
                    <h3 className='rounded-md p-2 px-7 border-[1px] text-richblack-50 bg-caribbeangreen-300  border-caribbeangreen-400 lg:px-4'>Deadline</h3>
                    <h3 className='rounded-md  p-2 px-7 border-[1px] text-richblack-50 bg-caribbeangreen-300 border-caribbeangreen-400 lg:px-3'>Days Remaining</h3>
                </h2>
            </div>

            {data.length !== null?
            (data.map((task)=> (
                <div key={task._id} className='flex w-full justify-center ml-4 mb-2 gap-6 h-28 border-y-2 border-richblack-200 lg:ml-0 lg:mb-0 lg:group  lg:h-16 lg:border-y-1'>
                    <div className='flex flex-col-reverse w-full  justify-center items-center lg:w-[60%] lg:flex-row   lg:ml-[-7rem] lg:gap-24'>
                        <div className='flex p-1 w-[100%] font-semibold text-richblack-900 group-hover:cursor-pointer  lg:p-3  lg:w-[45%]'>
                        <Link
                            to="/dashboard/atask"
                            onClick={()=>dispatch(setTaskDetails(task))}
                            className=" p-1 text-[12px] font-semibold w-[100%] text-richblack-50 group-hover:cursor-pointer lg:text-lg lg:p-3 lg:w-[95%] "
                        >
                            {task.Title}
                        </Link>
                        </div>
                        <div className={`p-1 w-[100%] rounded-md lg:rounded-xl lg:w-[15%]  ${task.status === "Complete" ?("bg-[#34b42e] text-white  border-[#1da816] "):(null)}
                                                ${task.status === "Pending" ?("bg-red-500 text-white  border-[#dc1515]"):(null)}
                                                ${task.status === "Ongoing" ?("bg-[#367CFE] text-white  border-[#4c3ffc]"):(null)}`
                                            }>
                                {task?.status}
                        </div>
                    </div>
                    <div className='p-1 flex flex-col gap-3 font-light text-richblack-800 lg:flex-row lg:font-semibold justify-center items-center lg:gap-3 w-[100%] lg:p-2 lg:w-[36%] lg:ml[-3rem]'>
                        <div className='w-[90%] text-richblack-100 lg:w-[50%] '>{(task?.dueDate?.toString().slice(0, 10))}</div>
                        <div className='text-red-500 font-semibold w-[50%] lg:w-[20%]'>{Math.ceil((new Date(Date.parse(task?.dueDate)).getTime() - new Date().getTime())/(1000 * 60 * 60 * 24))} Days</div>

                    </div> 
 
                </div>
                )))
            :(null)
            }
            

        </div>
        </div>








    );
};

export default TaskListTamplate;