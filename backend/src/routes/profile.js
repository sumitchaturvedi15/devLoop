const express=require("express");
const userAuth = require("../utils/userAuth");
const User=require("../models/mongoose");
const profileRouter=express.Router();

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

module.exports=profileRouter;