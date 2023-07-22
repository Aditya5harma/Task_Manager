const express = require("express")
const router = express.Router()

const { auth,isAdmin } = require("../middlewares/auth")

const {

        deleteAccount,
        getUserDetails,
        getAssignedTasks,
        getAllUsers,
    } = require("../controllers/profile")


// Delet User Account

router.delete("/deleteProfile", auth, deleteAccount)

// Get User Details

router.get("/getUserDetails", auth, getUserDetails)

// Get Enrolled Courses

router.get("/getAssignedTasks", auth, getAssignedTasks)

// Get list of users
router.get("/getAllUsers", auth,isAdmin, getAllUsers)


module.exports = router;