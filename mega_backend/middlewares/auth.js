const jwt = require("jsonwebtoken");
require("dotenv").config();

//auth

exports.auth = async (req, res, next) => {
    try{

    //extract token

        const token = req.cookies.token 
                        || req.body.token 
                        ||  (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));


    //if token missing, then return response

        if(!token) {
            return res.status(401).json({
                success:false,
                message:'Token is missing - user might not be logged in or unauthorised user ',
            });
        }

    //verify the token

        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }

        catch(err) {
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }

        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:error.message
            
        });
    }
}

//isStudent

exports.isEmployee = async (req, res, next) => {
    try{
        
        if(req.user.accountType !== "Employee") {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Employee only',
            });
        }

        next();
    }

    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
}

//isAdmin

exports.isAdmin = async (req, res, next) => {
    try{    
           console.log("Printing AccountType ", req.user.accountType);
           if(req.user.accountType !== "Admin") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Admin only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
}