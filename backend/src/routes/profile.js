const express=require("express");
const userAuth = require("../utils/userAuth");
const User=require("../models/mongoose");
const profileRouter=express.Router();
const bcrypt=require("bcrypt");

profileRouter.get("/profile",userAuth,async(req,res)=>{
    try{
        const user=req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("Error In Fetching Profile");
    }
})

profileRouter.delete("/profile/delete",userAuth,async(req,res)=>{
    try{
        const user=req.user;
        const id=user._id;
        await User.findByIdAndDelete(id);
        res.send("User Deleted Successfully");
    }
    catch{
        res.status(400).send("User Deletion Failed");
    }
})

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        const user=req.user;
        const _id=user._id;
        const data=req.body;
        const allowedData=["firstName","lastName","photoUrl","skills","languages","about","gender","age","height"]
        const userAllowed=Object.keys(data).every((key)=>allowedData.includes(key));
        if(!userAllowed){
            return res.send("Failed to update fields")
        }
        const {firstName,lastName,photoUrl,skills,languages,about,gender,age,height}=data;
        if(firstName){if(firstName.length<4 || firstName.length>20){
            console.log(req.body.firstName);
            return res.send("Name is not valid");
        }}
        if(lastName){if(lastName.length<4 || lastName.length>20){
            console.log(req.body.lastName);
            return res.send("Name is not valid");
        }}
        const validGender=["male","female","other"];
        if (gender !== undefined) {
            const genderNormalized = String(gender).trim().toLowerCase();
            const validGender = ["male", "female", "other"];

            if (!validGender.includes(genderNormalized)) {
                return res.status(400).send("Invalid gender type");
            }
        }
        if(age<18 || age>150){
            return res.send("Age is not valid");
        }
        if(height<100 || height>400){
            return res.send("Enter valid height");
        }
        await User.findByIdAndUpdate(_id,{
            firstName,lastName,photoUrl,skills,languages,about,gender,age,height
        },
        {runValidators:true});
        const updatedData=await User.findById(_id);
        res.send(updatedData);

    }
    catch(err){
        res.status(400).send("Error");
    }
})

profileRouter.patch("/profile/edit/password", userAuth,async(req,res)=>{
    try{
        const _id=req.user._id;
        const {password}=req.body;
        const passwordHash=await bcrypt.hash(password,10);
        await User.findByIdAndUpdate(_id,{
            password:passwordHash,
        })
        res.send("Password updated successfully");
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
})

module.exports=profileRouter;