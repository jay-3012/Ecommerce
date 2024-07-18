import User from "../model/usermodel.js";
import bcrypt from "bcryptjs";

export const signup = async(req,res)=>{
    try {
        const {fullname, email, password}= req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"Email already exist"});
        }
        const hashPassword =await bcrypt.hash(password,10);
        const createdUser = new User({
            fullname:fullname,email:email,password:hashPassword
        });
        await createdUser.save();
        res.status(201).json({message:"User ccreated successfully"});
    } catch (error) {
        console.log("Erroor: ",error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user = await User.findOne({email});
        const isMatch = await bcrypt.compare(password,user.password );
        if(!user || !isMatch){
            return res.status(400).json({message:"invalid email or password"});
        }else{
            return res.status(200).json({message:"Log in successfully",user:{
                _id:user._id,
                fullname:user.fullname,
                email:user.fullname
            }})
        }
    } catch (error) {
        console.log("Error: ",error);
        res.status(500).json({message:"Internal server Error"})
    }
}