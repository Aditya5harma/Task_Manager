import React, { useEffect, useState } from 'react';
import TaskListTamplate from './TaskListTamplate';
import {  useSelector } from 'react-redux';
import { getusersTask } from '../../../services/operations/taskAPI';
import { useDispatch } from 'react-redux';
import { setTasks } from '../../../slices/tasks';

const Tasks = () => {
    //get data from store 
    const {token} = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const [tasklist, setTasklist] = useState([])

    const getTaskList = async()=>{
        try {
        const res = await getusersTask(token,dispatch)
        console.log(`getTask response.....` ,res)
        dispatch(setTasklist(res))
        dispatch(setTasks(res))
            
        } catch (error) {
            console.log(error)
        } 
    }
    useEffect(()=>{
        getTaskList()
    },[])
    
    
    return (
        <div>
            <TaskListTamplate data={tasklist} heading="All Tasks"></TaskListTamplate>
        </div>
    );
};

export default Tasks;