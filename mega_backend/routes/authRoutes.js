const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions

const {
        login,
        signup,
} = require("../controllers/Auth")


// const { auth } = require("../middlewares/auth")


// for user login

router.post("/login", login)

// for user signup

router.post("/signup", signup)

module.exports = router