const User = require("../models/User");
const Tasks = require("../models/Tasks");
require("dotenv").config();


//create new task -- admin

exports.createTask = async(req,res) => {
    
try {
    const{
        Title,  
        Description,
		allocatedUser_ids,
		dueDate,
    } = req.body;

	let {status} = req.body;


    // Check if any of the required fields are missing

        if (
				!Title ||
				!Description ||
				!allocatedUser_ids.length ||
				!dueDate 
			) {
            return res.status(400).json({
                success: false,
                message: "All Fields are Mandatory plase fill all the fields before creating Task",
            });
        }

		//allocated user should not be admin

		console.log(`details-${allocatedUser_ids} ${dueDate}`)

        if (!status || status === undefined) {
			status = "Pending";
		}


	// upload data to db to create a new task with the given details

		const newTask = await Tasks.create({
			Title,
			Description,
			dueDate,
			allocatedUser: allocatedUser_ids, //could be needed to update as per frontend request
			status
		});
		const {_id} = newTask
        console.log(newTask);

    // Add the new task to the User Schema of the employee

	for (const userId of allocatedUser_ids) {
		await User.findByIdAndUpdate(userId, {
		$push: { tasksAssigned: _id },
		})
	}

            
	// Return the new task and a success message

		res.status(200).json({
			success: true,
			data: newTask,
			message: "Congratulations! Your Task Created Successfully",
		});

	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create task please try again later or report the issue if error occuring each time",
			error: error.message,
		});
	}
};


// get all the tasks created --admin

exports.getAllTasks = async (req, res) => {
	try {
		const statusPriority = {
			Ongoing: 1,
			Pending: 2,
			Complete: 3,
		  };
		  
		  let allTasks = await Tasks.find({})
			.select({
			  Title: true,
			  Description: true,
			  status: true,
			  dueDate: true,
			  allocatedUser: true,
			  updatedAt: true,
			  createdAt: true,
			})
			.exec();

			allTasks.sort((task1, task2) => {
					
				// const {pending} = statusPriority

				const statusPriority1 = statusPriority[task1.status] 
				const statusPriority2 = statusPriority[task2.status] 

				// console.log(`this is` ,statusPriority.pending, `this not`,statusPriority) 
			  
				// Compare status priority first
				if (statusPriority1 !== statusPriority2) {
				  return statusPriority1 - statusPriority2;
				}
			  
				// If status priorities are the same, sort by dueDate in ascending order
				return new Date(task1.dueDate) - new Date(task2.dueDate);
			  });


			return res.status(200).json({
				success: true,
				data: allTasks,
			});
		}

		catch (error) {
		console.log(error);
		return res.status(404).json({
			success: false,
			message: `tasks can not be loaded PLEASE TRY AGAIN`,
			error: error.message,
		});
	}
};

// Delete the task

exports.deleteTask = async (req, res) => {
	try {
	  	const { taskId } = req.body
  
	  // Find the task

		const task = await Tasks.findById(taskId)
		if (!task) {
			return res.status(404).json({ 
				success: false,
				message: "Task not found" 
			})
		}

	  // Remove task from all users

		const assignedUsers = task.allocatedUser
		for (const userId of assignedUsers) {
			await User.findByIdAndUpdate(userId, {
			$pull: { tasksAssigned: userId },
			})
		}

	  // Delete the task

		await Tasks.findByIdAndDelete(taskId)
	
		return res.status(200).json({
			success: true,
			message: "Task deleted successfully",
		})
	} 	
	catch (error) {
		console.error(error)
		return res.status(500).json({
			success: false,
			message: "Server error",
			error: error.message,
		})
	}
}



// Edit task status

exports.editStatus = async(req,res) => {
	try {
		const{newStatus,taskId} = req.body

		if(!newStatus && !taskId){
			return res.status(403).json({
				success:false,
				error:`newStatus or taskId field empty`
			})
		}

		const updatedStatus = await Tasks.findByIdAndUpdate(taskId,
										{status:newStatus},
										{new:true}
									 )
		res.status(200).json({
			success:true,
			message:`successfully updated task status`,
			data:updatedStatus
		})
	} catch (error) {
		return res.status(403).json({
			success:false,
			error:`error in serverside status updation -${error}`
		})
	}
}

