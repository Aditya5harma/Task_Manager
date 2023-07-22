import React from 'react';
import SideBar from '../components/common/SideBar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='bg-richblack-700'>
            <div className=' flex min-h-screen '>
                <div className=''>
                    <SideBar/>
                </div>
                <div className='h-screen flex-1 overflow-y-auto overflow-x-hidden'>
                    <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                        <Outlet/>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Dashboard ;