const express= require("express");
const jwt=require("jsonwebtoken");
const User=require("../models/mongoose");
const isValidated=require("../utils/validation");
const cookieParser=require("cookie-parser");
const authRouter=express.Router();
const bcrypt=require("bcrypt");
authRouter.use(cookieParser());
const validator=require("validator");

authRouter.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const isEmailValid= validator.isEmail(email);
        if(!isEmailValid){
            throw new Error("Enter Valid Email");
        }
        const user=await User.findOne({
            email:email
        })
        if(!user){
            throw new Error("User Not Found");
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(isPasswordValid){
            const token=await jwt.sign({_id:user._id},"Keytoken");
            res.cookie("token",token);
            res.send(user);
        }
        else{
            throw new Error("Wrong Password");
        }
    }
    catch(err){
        res.status(400).send(err.message);
    }

})

authRouter.post("/signUp",async(req,res)=>{
    try{
        const data=req.body;
        isValidated(data);
        const {firstName, lastName, email, password}=data;
        const passwordHash= await bcrypt.hash(password,10);
        const user= new User({
            firstName,
            lastName,
            email,
            password:passwordHash
        });
        await user.save();
        res.send("User Signed Up");
    }
    catch(err){
        res.status(400).send("Error In SignUp");
    }
})

authRouter.post("/logout",async(req,res)=>{
    try{
         await res.cookie("token",null,{
            expires: new Date(Date.now())
        })
        res.send("Logout Successfully")
    }
    catch(err){
        res.status(400).send("Failed To Logout");
    }
})

module.exports=authRouter;