import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserlist } from '../../../services/operations/userAPI';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserDetails } from '../../../slices/profile';


const UserList = () => {
    const dispatch = useDispatch()

    const {token} = useSelector((state) => state.auth)
    const {userlist} = useSelector((state)=> state.profile)


    const data = userlist.length !== null ?(userlist):([])

    const fetchUserlist =() => {
        try {
            dispatch(getUserlist(token))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchUserlist()
    },[])
    return (
        <div>
            <h1 className="mb-1 mx-24 mt-2 text-lg font-medium text-caribbeangreen-100 translate-y-[-1rem] lg:mx-5 lg:2xl">
                User - List
            </h1>

            <div className='  scroll-container overflow-y-auto overflow-x-hidden min-h-screen  md:visible lg:visible'>
            <div className='flex invisible items-center justify-evenly h-20 border-y-2 md:visible lg:visible border-richblack-900 bg-richblack-800'>
                <h2 className='p-2 px-10 mr-16 font-bold text-richblack-50  bg-caribbeangreen-300 rounded-md border-[1px] border-caribbeangreen-400'>
                    Name
                </h2>
                <h2 className='p-2 px-10 font-bold text-richblack-50 bg-caribbeangreen-300 rounded-md border-[1px] border-caribbeangreen-400'>
                    Email-Address
                </h2>
                <h2 className='p-2 px-10 font-bold text-richblack-50 bg-caribbeangreen-300 rounded-md border-[1px] border-caribbeangreen-400'>
                    Contact
                </h2>
                <h2 className='p-2 px-10 font-bold text-richblack-50 bg-caribbeangreen-300 rounded-md border-[1px] border-caribbeangreen-400'>
                    Pending 
                </h2>

            </div>

            {data?.length !== null?
            (data.map((user)=> (
                <div key={user._id} className='flex flex-col w-screen translate-y-[-3rem] items-center  h-28 border-y-2 border-richblack-100 group lg:h-12 lg:flex-row lg:translate-y-[0]'>
                    <div className=' p-1 lg:p-3 w-[90%] font-semibold text-richblack-900 group-hover:cursor-pointer lg:w-[23%]'>
                    <Link
                        to="/dashboard/auser"
                        onClick={()=>dispatch(setUserDetails(user))}
                        className="p-3 ml-8 mx-auto lg:mx-0 font-semibold text-caribbeangreen-50 group-hover:cursor-pointer"
                    >
                        {`${user.firstName} ${user.lastName}`}
                    </Link>
                    </div>
                    <div className={` p-1 lg:p-3 mx-auto lg:mx-0 rounded-xl w-[90%] text-white pl-3 lg:w-[9%] `}>
                        {user?.email}
                    </div>
                    <div className=' p-1 lg:p-2 mx-auto lg:mx-0 font-normal w-[90%] text-richblack-800 flex justify-center items-center gap-16 lg:w-[40%]'>
                        <div className={`p-0 lg:p-3 rounded-xl  text-white  font-normal justify-center items-center gap-16 `}>
                            +{`${user?.countryCode} ${user?.contactNumber}`}
                        </div>
                        <div className={`ml-7 p-3 text-xl font-bold rounded-xl  text-red-500 hidden lg:block`}>
                            {user?.tasksAssigned.filter((task) => task.status === "Pending").length}
                        </div>
                    </div>
                </div>
                )))
            :(null)
            }
        </div>
        </div>     

    );
};

export default UserList;