import React, { useState } from 'react';
import '../../../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Login } from '../../../services/operations/autharisationAPI';
import { getTasks } from '../../../services/operations/taskAPI';

const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const[logindata,setlogindata] = useState({
                                                email: "",
                                                password: ""
                                            });

    const datachangeHandler = (e) => {
        const updateddata = {
                                ...logindata,
                                [e.target.name]: e.target.value,
                            };
        setlogindata(updateddata)

    }

    const submitHandler = async(e) => {
        e.preventDefault()
        try {
            dispatch(Login(logindata,navigate))
        } catch (error) {
            console.log(error)
        }
           
    }

    return (
        <div>
            <div className='input:checked ~ .radio '>
                <div className="flex justify-center items-center border-[2px] border-[#f4d493] rounded-xl shadow-lg m-5 bg-richblack-800 w-fit mx-auto my-8">
                    <div className="bg-[#FFF6E4] rounded-xl">
                        <div className="inline-flex rounded-xl">
                            <input type="radio" name="room_type" id="roomPrivate"  hidden/>
                            <label htmlFor="roomPrivate" className="radio text-center self-center py-2 px-5 rounded-xl cursor-pointer hover:opacity-75 font-semibold text-richblack-800">Employee</label>
                        </div>
                        <div className="inline-flex rounded-xl">
                            <input type="radio" name="room_type" id="roomPublic" hidden/>
                            <label htmlFor="roomPublic" className="radio text-center self-center py-2 px-4 rounded-xl cursor-pointer hover:opacity-75 font-semibold text-richblack-800">Admin</label>
                        </div>
                    </div>
                </div>
            </div>
            <form  onSubmit = {submitHandler} className='flex flex-col justify-center '>
                <div className='flex flex-col my-2'>
                <label htmlFor="emailid" className=' text-sm text-richblack-25 font-inter font-semibold'>Email Address :</label>
                    <input
                        className='border-1px border-richblack-600 rounded-md px-4 py-2 bg-richblack-600 text-white w-[30rem] sm:w-[20rem] m-1'
                        onChange={datachangeHandler}
                        id='emailid'
                        type='email'
                        name='email'
                        value={logindata.email}
                        placeholder='xyz@gmail.com'
                        required
                        
                    />
                </div>

                <div className='flex flex-col mt-2'>
                <label htmlFor="password" className=' text-sm text-richblack-25 font-inter font-semibold'>Password :</label>
                    <input
                        className='border-1px border-richblack-600 rounded-md px-4 py-2 bg-richblack-600 text-white w-[30rem] sm:w-[20rem] mx-1 mt-1'
                        onChange={datachangeHandler}
                        id='password'
                        type='password'
                        name='password'
                        value={logindata.password}
                        placeholder='xdmdfnds345'
                        required
                        
                    />
                </div>
                <Link to='/forgot-password'>
                    <p className=" ml-auto max-w-max text-xs text-[#367CFE]">forgot password</p>
                </Link>

                <button
                    type='submit'
                    className='border-1px border-[#0f4fc5] rounded-md px-4 py-2 bg-[#367CFE] text-white w-[30rem] sm:w-[20rem] m-1 mt-[5rem] mx-auto'
                >
                    Log In
                </button>
            </form>
            <Link to={"/signup"} className='text-[#0f4fc5] font-semibold text-sm'>
                Do Not Have an account ?
            </Link>
        </div>
        
            
        
    );
};

export default LoginForm;