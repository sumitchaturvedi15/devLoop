const ConnectionRequest = require("../models/connectionRequest");
const express= require("express");
const requestRouter=express.Router();
const userAuth=require("../utils/userAuth");
const User = require("../models/mongoose");

requestRouter.post("/request/sent/:status/:toUser", userAuth, async(req,res)=>{
    try{
        const fromUser=req.user._id;
        const toUser=req.params.toUser;
        const status=req.params.status;
        const onlyStatus=["ignored", "interested"];
        const statusValid= onlyStatus.includes(status);
        if(!statusValid){
            return res.send("Not Valid Request");
        }
        if(fromUser==toUser){
            return res.send("Not Valid Request");
        }
        const sender= await User.findById(fromUser);
        const receiver= await User.findById(toUser);
        if(!receiver){
            return res.send("User not valid");
        }
        const isPresent=await ConnectionRequest.findOne({
            $or: [{fromUser:fromUser, toUser:toUser},{fromUser:toUser, toUser:fromUser}]
        })
        if(isPresent){
            return res.send("Already sent the request");
        }
        const connection= new ConnectionRequest({
            fromUser:fromUser, 
            toUser:toUser, 
            status:status
        });
        await connection.save();
        if(status=="interested"){
            res.send("Request Sent Successfully");
        }
        else{
            res.send(`Not intereted in ${receiver.firstName}`);
        }
        // res.send(`${sender.firstName} ${status} ${receiver.firstName} successfully`);
    }
    catch(err){
        res.status(400).send("Bad request");
    }
})


requestRouter.post("/request/review/:status/:requestId", userAuth, async (req,res)=>{
        try{
            const {status,requestId}=req.params;
            const user=req.user;
            const isAllowed=["accepted", "rejected"];
            if(!isAllowed.includes(status)){
                return res.send("Status not valid");
            }
            const requestIdCheck=await ConnectionRequest.findOne({
                _id: requestId,
                toUser: user._id,
                status: "interested"
            })
            if(!requestIdCheck){
                return res.send("No such request found");
            }
            requestIdCheck.status=status;
            await requestIdCheck.save();
            res.send("Updated request successfully");
        }
    catch(err){
        res.send("Error in the review code");
    }
})


module.exports=requestRouter;