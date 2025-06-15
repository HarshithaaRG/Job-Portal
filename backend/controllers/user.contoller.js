import {User} from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { spawn } from 'child_process';
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const register=async (req , res)=>{
    try{
        const {fullname, email,phoneNumber, password,role}=req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:'Some details are missing',
                success:false
            })
        }
        const file=req.file;
        const fileUri=getDataUri(file);
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content);
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
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url
            }
        })
        return res.status(201).json({
            message:"Account created successfully",
            success:true
        })
    }
    catch(error){
        console.log(error);
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
        let user=await User.findOne({email});
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
            userId:user._id
        }
        const token=await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});

        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
            message:`welcome back ${user.fullname}`,
            user,
            success:true,
        })

    }
    catch(error){
        console.log(error);

    }
}
export const logout=async(req,res)=>{
    try{
        return res.status(200).cookie("token","", {maxAge:0}).json({
            message:"Logout successfull",
            success:true
        })
    }
    catch(error){
        console.log(error);
    }
}
export const updateProfile=async(req,res)=>{
    try{
        const {fullname,email,phoneNumber,bio,skills}=req.body;
        const file=req.file;

        const fileUri=getDataUri(file);
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content,{resource_type:"raw"});
        
        let skillsArray;
        if(skills){
            skillsArray=skills.split(",");

        }        
        const userId=req.id;//middleware auth
        let user=await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message:"user not found",
                success:false
            })
        }
        //updating data
        if(fullname) user.fullname=fullname
        if(email) user.email=email
        if(phoneNumber) user.phoneNumber=phoneNumber
        if(bio) user.profile.bio=bio
        if(skills) user.profile.skills=skillsArray

        
        if(cloudResponse){
            user.profile.resume=cloudResponse.secure_url//save the cloudinary url
            user.profile.resumeOriginalName=file.originalname//save the original file name
        }
        console.log("Uploading file:", file.originalname);
        console.log("File URI:", fileUri.content.substring(0, 100));
        console.log("Cloudinary Response:", cloudResponse);

        await user.save()

        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        

        return res.status(200).json({
            message:'Profile updated successfully',
            user,
            success:true,
        })
    }catch(error){
        console.log(error)
    }
}

export const analyse_resume=async(req,res)=>{
    const resumePath = req.file.path;
    const jobDescription = req.body.jd;
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);


    const pythonProcess = spawn('python', [
        path.join(__dirname, "..", 'gemini_ats.py'),
        resumePath,
        jobDescription,
    ]);

    let data = '';
    pythonProcess.stdout.on('data', (chunk) => {
        data += chunk.toString();
    });

    pythonProcess.stderr.on('data', (err) => {
        console.error('Python error:', err.toString());
    });

    pythonProcess.on('close', (code) => {
        fs.unlinkSync(resumePath); // delete the uploaded file
        if (code === 0) {
        res.json({ result: data.trim() });
        } else {
        res.status(500).json({ error: 'Python script failed' });
        }
    });
}