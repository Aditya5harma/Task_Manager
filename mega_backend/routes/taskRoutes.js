const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import

const {
    createTask,
    getAllTasks,
    deleteTask,
    editStatus
} = require("../controllers/Tasks")




// Importing Middlewares

const { auth, isEmployee, isAdmin } = require("../middlewares/auth")



// Courses can Only be Created by Instructors

router.post("/createTask", auth, isAdmin, createTask)

// Get all Registered Courses

router.get("/getAllTasks",auth,isAdmin, getAllTasks)


router.delete("/deleteTask", auth,isAdmin, deleteTask)

router.put("/editStatus",auth, editStatus)

module.exports = router
