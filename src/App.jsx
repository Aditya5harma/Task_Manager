import '../src/App.css'
import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ContactUsform from './components/common/contactUsform'
import MyProfile from './components/common/MyProfile';
import {ACCOUNT_TYPE} from "./utils/constants"
import PrivateRoute from './components/common/PrivateRoute'
import Dashboard from './pages/Dasshboard';
import Pending from './components/core/tasks/Pending';
import Complete from './components/core/tasks/Complete';
import OnGoing from './components/core/tasks/OnGoing';
import {  useSelector } from "react-redux";
import Tasks from './components/core/tasks/Tasks';
import Tasklist from './components/core/tasks/Tasklist';
import CreateTask from './components/core/tasks/CreateTask';
import UserList from './components/core/user/UserList';
import ATask from './components/core/tasks/ATask';
import AUser from './components/core/user/AUser';
import BarChart from './components/core/Data dashboard/BarChartStatus';

const App = () => {

    const { user } = useSelector((state) => state.profile)
    console.log("user......",user)

    return (
        <div>

            <Routes>
                <Route path='/' element={<Login/>}></Route>
                
                <Route path='/signup' element={<Signup/>}></Route>

                <Route path='/login' element={<Login/>}></Route>

                <Route path='/logout' element={<Login/>}></Route>


                <Route 
                    element={
                        <Dashboard />
                    }
                    >
                    {
                        user?.accountType === ACCOUNT_TYPE.EMPLOYEE && (
                        <>
                            <Route path="dashboard/profile" element={<MyProfile />} />
                            <Route path="dashboard/task" element={<Tasks />} />
                            <Route path="dashboard/contact" element={<ContactUsform/>} />
                            <Route path="dashboard/pending" element={<Pending/>} />
                            <Route path="dashboard/complete" element={<Complete/>} />
                            <Route path="dashboard/ongoing" element={<OnGoing/>} />
                            <Route path="dashboard/atask" element={<ATask/>} />
                        </>
                        )
                    }

                    {
                         user?.accountType === ACCOUNT_TYPE.ADMIN && (
                         <>
                            <Route path="dashboard/createtask" element={<CreateTask/>} />
                            <Route path="dashboard/employees" element={<UserList/>} />
                            <Route path="dashboard/tasklist" element={<Tasklist />} />
                            <Route path="dashboard/pending" element={<Pending/>} />
                            <Route path="dashboard/complete" element={<Complete/>} />
                            <Route path="dashboard/ongoing" element={<OnGoing/>} />
                            <Route path="dashboard/profile" element={<MyProfile />} />
                            <Route path="dashboard/auser" element={<AUser />} />
                            <Route path="dashboard/data" element={<BarChart/>} />


                        
                        
                        /</>
                        )
                    }
                    </Route>

        
            </Routes>
            
        </div>


    );
};

export default App;