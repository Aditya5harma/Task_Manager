import React from 'react';
import TaskListTamplate from './TaskListTamplate';
import { useSelector } from 'react-redux';

const Pending = () => {
    //get data from store 
    const {tasks} = useSelector((state) => state.tasks)
    const {taskList} = useSelector((state) => state.tasks)
    const {user} = useSelector((state) => state.profile)

    const Data = user.accountType === "Employee"?(tasks):(taskList)

    //filter data
    const pendingTasks = Data.filter(task => task.status === "Pending");
    console.log(`Tasks.......`,tasks);
    console.log(`pendingTasks.......`,pendingTasks);

    if (!tasks) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <TaskListTamplate data={pendingTasks} heading="Pending"></TaskListTamplate>
        </div>
    );
};

export default Pending;