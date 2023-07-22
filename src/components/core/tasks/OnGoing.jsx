import React from 'react';
import TaskListTamplate from './TaskListTamplate';
import { useSelector } from 'react-redux';


const OnGoing = () => {
        //get data from store 
        const {tasks} = useSelector((state) => state.tasks)
        const {taskList} = useSelector((state) => state.tasks)
        const {user} = useSelector((state) => state.profile)

        const Data = user.accountType === "Employee"?(tasks):(taskList)
        //filter data
        const ongoingTasks = Data.filter(task => task.status === "Ongoing");
        console.log(ongoingTasks);

    return (
        <div>
            <TaskListTamplate data={ongoingTasks} heading="On-Going"></TaskListTamplate>
        </div>
    );
};

export default OnGoing;