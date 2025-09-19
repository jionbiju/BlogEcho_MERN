import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import createToken from "../utils/createToken.js";

export const createUser = async(req,res) => {
    try {
        const {email,username,password} = req.body;
        if(!email || !username || !password){
            return res.status(400).json({
                message:"Please fill all the fields"
        })
        }

        const userExist = await userModel.findOne({email})
        if(userExist){
            return res.status(400).json({
                message:"User with this email already exists."
            })
        } 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            username:username.trim(),
            email:email.trim().toLowerCase(),
            password:hashedPassword
        })
        const savedData = await newUser.save();
        return res.status(201).json({
            message:"User created successfully",
            user:{
                userId:savedData._id,
                username:savedData.username,
                email:savedData.email
            }
        })
    } catch (error) {
        console.log("Error in Registering user:",error);
        res.status(500).json({
            error:error.message
        })
    }
}

export const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(user && await bcrypt.compare(password,user.password)){
            createToken(res,user.id);
            return res.status(200).json({
                message:"Login successfully",
            })
        }
        else{
            return res.status(400).json({
                message:"Invalid Credentials"
            })
        }
    } catch (error) {
        console.log("Error in login:",error);
        res.status(500).json({
            error:error.message
        })
    }
}

export const logoutUser = async (req,res) => {
    try {
        res.clearCookie("jwt",{sameSite:"none",secure:true}).status(200).send("User logged out successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}