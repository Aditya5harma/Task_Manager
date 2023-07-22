import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { getTasks } from '../../../services/operations/taskAPI';
import TaskListTamplate from './TaskListTamplate';
import { useEffect } from 'react';
import { setTasksList } from '../../../slices/tasks';

const Tasklist = () => {

    const {token} = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    // console.log(`token fetched inside component`,token) //this is successfully returning 

    const [tasklist, setTasklist] = useState([])

    console.log(`tasklist.....`,tasklist)

    const getTaskList = async () => {
        try {
          const res = await getTasks(token,dispatch);
          console.log("getTask response.....", res);
          dispatch(setTasklist(res))
          dispatch(setTasksList(res))
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(()=>{
        getTaskList()
    },[])
    
    
    return (
        <div>
            <TaskListTamplate data={tasklist} heading="All Tasks"></TaskListTamplate>
        </div>
    );
};

export default Tasklist;