const User = require("../models/User");
require("dotenv").config();
const Tasks = require("../models/Tasks")



exports.deleteAccount = async (req, res) => {

	try {

		console.log("Printing ID: ", req.user.id);
		const id = req.user.id ? (req.user.id) : (req.body)
		
		const user = await User.findById({ _id: id });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}


	// Remove User From All the Allocated Task

        await Tasks.updateMany({allocatedUser:{$in:[id]}},{$pull:{allocatedUser:id}},{ new: true });

	// Now Delete User

		await User.findByIdAndDelete({ _id: id });

		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});

	} catch (error) {
		console.log(error);
		res.status(500).json({ 
            success: false, 
            message: "User Cannot be deleted successfully" 
        });
	}
};

    //get all users details

exports.getUserDetails = async (req, res) => {

	try {
		const id = req.user.id;

		const userDetails = await User.findById(id)

		console.log(userDetails);

		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});

	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

	//get all tasks assigned to a perticular user
  
exports.getAssignedTasks = async (req, res) => {
    try {
      const userId = req.user.id
      const assignedTasks = await User.findOne({
        _id: userId,
      })
        .populate("tasksAssigned")
        .exec()
      if (!assignedTasks) {
        return res.status(400).json({
          success: false,
          message: `No tasks assigned to the user: ${userId}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: assignedTasks.tasksAssigned
      })
    } catch (error) {
		console.log(`error in getAssignedTasks api serverside`,error)
      return res.status(500).json({
        success: false,
        error: error.message,
      })
    }
};


	//get all users

exports.getAllUsers = async(req,res) => {
	try {
		const users = await User.find({}).select({
													firstName: true,
													lastName: true,
													email:true,
													password:true,
													accountType:true,
													confirmPassword:true,
													contactNumber:true,
													countryCode:true,
													tasksAssigned:true
												})


		.populate("tasksAssigned",'Title Description dueDate status')	 
		.sort({ firstName: 1,lastName:1 })	// Sort in ascending order based on the firstName field alphabatically
		.exec();

		res.status(200).json({
			success:true,
			data:users,
			message: `users fetching successful`
		})
	} catch (error) {
		return res.status(403).json({
			success:false,
			error:`error in serverside fetching users ${error}`
		})
	}

}
