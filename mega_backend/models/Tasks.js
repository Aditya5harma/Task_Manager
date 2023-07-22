const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    Title: { 
        type: String
    },
	Description: {
        type: String 
    },
	allocatedUser: [
		{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		}
	],
	status: {
		type: String,
		enum: ["Pending", "Complete","Ongoing"],
	},
	dueDate: {
		type: Date,
		required: true,
	}

},
	{ timestamps: true }
);

module.exports = mongoose.model("Tasks", TaskSchema);