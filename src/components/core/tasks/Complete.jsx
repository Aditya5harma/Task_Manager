import React from 'react';
import TaskListTamplate from './TaskListTamplate';
import { useSelector } from 'react-redux';


const Complete = () => {
        //get data from store 
        const {tasks} = useSelector((state) => state.tasks)
        const {taskList} = useSelector((state) => state.tasks)
        const {user} = useSelector((state) => state.profile)
    
        const Data = user.accountType === "Employee"?(tasks):(taskList)

        //filter data
        const CompleteTasks = Data.filter(task => task.status === "Complete");
        console.log(CompleteTasks);
    return (
        <div>
            <TaskListTamplate data={CompleteTasks} heading="Completed"></TaskListTamplate>
        </div>
    );
};

export default Complete;