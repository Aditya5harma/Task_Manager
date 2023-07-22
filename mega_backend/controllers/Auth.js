const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
require("dotenv").config();


//signup controller

exports.signup = async(req,res) => {
    try {

    //fetching data from request

        const{
                firstName,
                lastName,
                email,
                password,
                accountType,
                confirmPassword,
                contactNumber,
                countryCode
            } = req.body;

    //check for all data available 

        if( !firstName||
            !lastName||
            !email||
            !password||
            !accountType||
            !confirmPassword||
            !countryCode){
                return res.status(403).json({
                    success:false,
                    message:"please fill all the fields"
                })
            }

    //check if password and confirm password matches
        
        if (password !== confirmPassword) {
            return res.status(407).json({
                success:false,
                message:"Confirm Password and Password fields are not matching"
            })
        }
            
    //chech for already registered user
        
        const registered = await User.findOne({email:email})
        if(registered){
            return res.status(400).json({
                success:false,
                message: "already exist user with the given email"
            })
        }
        

    //hashing the password

        const hashedPassword = await bcrypt.hash(password,10)

    //creating user

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            countryCode,
            password: hashedPassword,
            accountType: accountType,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,

        });

		return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
	}
};

//Login

    exports.login = async(req,res)=>{
        try {
            const{email,password} = req.body;

    //validation check if all fields filled

        if(!email||!password){
            return res.status(404).json({
                success:false,
                message:"please fill all the fields"
            })
        }

    //validation check if user registerd or not 

        const registerduser = await User.findOne({email :email})
        console.log(registerduser);
        if(!registerduser){
            return res.status(402).json({
                success:false,
                message:"user not registerd please register first"
            })
        }

    //validation check if password enterd is correct

    if (!bcrypt.compare(password, registerduser.password)){
            return res.status(405).json({
                success:false,
                message:"enterd password is incorrect please enter the correct password"
            })
        }else{
            const user = await User.findOne({email}).populate("tasksAssigned").exec()
            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType
            };

    //create jwt token and setting it to response

            const token = jwt.sign(payload, process.env.JWT_SECRET,
                {
                    expiresIn: "12h",
                });

            user.password = undefined;
            user.token = token;

            const options = {
				expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
				httpOnly: true,
			};
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});
        }   
        } catch (error) {
            console.log(error);
            // Return 500 Internal Server Error status code with error message
            return res.status(500).json({
                success: false,
                message: `Login Failure Please Try Again`,
            });
        }
        
    }


