const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
        trim:true,
    },
    lastName :{
        type:String,
        required:true,
        trim:true,
    },
    email: {
        type:String,
        required:true,
        trim:true,
    },
    password: {
        type:String,
        required:true,
    },
    accountType: {
        type:String,
        enum:["Admin", "Employee"],
        required:true    
    },
    contactNumber: {
        type:Number,
        trim:true,
    },
    countryCode: {
        type:Number,
        trim:true,
    },
    tasksAssigned: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Tasks",
        }
    ],
    image:{
        type:String,
        required:true,
    },
    message_Id: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"contactFormMessages",
        }
    ]
    
},

{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);