import React from 'react';

const AuthTamplate = ({form}) => {
    return (
        <div className='flex justify-center gap-20 bg-black min-h-screen w-screen items-center  '>
            <div className='flex flex-col justify-center gap-4 '>
                <div>
                    <h1 className='text-richblack-25 text-[2rem] font-extrabold mt-[4rem]'>Welcome Back</h1>
                    <h3 className='text-richblack-50 text-md font-semibold font-inter'>"Master Time, Achieve More"</h3>
                    <h3 className='text-[#367CFE] text-md italic '>Be unstoppable</h3> 
                </div>
                <div>
                    {form}
                </div>
            </div>     
        </div>
        
    );
};

export default AuthTamplate;