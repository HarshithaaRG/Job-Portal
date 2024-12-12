import {User} from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
export const register=async (req , res)=>{
    try{
        const {fullname, email,phoneNumber, password,role}=req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:'Some details are missing',
                success:false
            })
        }
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"User already exists with this email",
                success:false
            })
        }
        const hashedPassword=await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role
        })
    }
    catch(error){


    }
}
export const login=async(req,res)=>{
    try{
        const {email, password,role}=req.body;
        if(!email ||!password || !role){
            return res.status(400).json({
                message:'Some details are missing',
                success:false
            })
        }
        const user=User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Incorrect email or password",
                success:false
            })
        }
        const isPasswordMatched=await bcrypt.compare(password,user.password);
        if(!isPasswordMatched){
            return res.status(400).json({
                message:"Incorrect email or password",
                success:false
            })
        }
        //check if role is correct 
        if(role!=user.role){
            return res.status(400).json({
                message:'Account does not exist with current role',
                success:false
            })
        }
        const tokenData={
            userId:user_.id
        }
        const token=await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly:true,sameSite:'strict'}).json({
            message:`welcome back ${user.fullname}`,
            success:true,
        })

    }
    catch(error){

    }
}