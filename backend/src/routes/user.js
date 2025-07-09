const express=require("express");
const userRouter=express.Router();
const userAuth=require("../utils/userAuth");
const ConnectionRequest=require("../models/connectionRequest");
const User=require("../models/mongoose");

userRouter.get("/user/request/recieved", userAuth, async (req,res)=>{
    try{
        const user=req.user._id;
        const data=await ConnectionRequest.find({
            toUser:user,
            status:"interested"
        }).populate("fromUser",["firstName", "lastName"]);
        res.json({
            message:"User request: ",
            data: data,
        })
    }
    catch(err){
        res.send("Unable to fetch requests");
    }
});

userRouter.get("/user/connections", userAuth, async (req,res)=>{
    try{
        const user=req.user;
        const data=await ConnectionRequest.find({
            $or:[
                {fromUser:user._id, status:"accepted"}, 
                {toUser:user._id, status:"accepted"}
            ]
        }).populate("fromUser",["firstName","lastName","skills","gender","age"]).populate("toUser",["firstName","lastName","skills","gender","age"]);
        const connectionData=data.map((row)=>{
            if(row.fromUser._id.toString() === user._id.toString()){
                return row.user;
            }
            return row.fromUser;
        });
        res.json(connectionData);
    }
    catch(err){
        res.send("Unable to fetch connections");
    }
})

userRouter.get("/feed", userAuth, async (req,res)=>{
    try{
        const user=req.user;
        const page=parseInt(req.query.page)||1;
        const limit=parseInt(req.query.limit)||10;
        const skip=(page-1)*limit;
        const connectionAlready=await ConnectionRequest.find({
            $or:[
                {"fromUser":user._id},{"toUser":user._id}
            ]
        }).select("fromUser toUser");
        const uniqueConnection=new Set();
        connectionAlready.forEach((req)=>{
            uniqueConnection.add(req.fromUser.toString());
            uniqueConnection.add(req.toUser.toString());
        });
        const users=await User.find({
            $and:[
                {_id: {$nin: Array.from(uniqueConnection)} },
                {_id: {$ne: user._id}}
            ]
        }).select("firstName lastName photoUrl age gender skills").skip(skip).limit(limit);
        res.send(users);
    }
    catch(err){
    res.status(500).send({ error: "Error in fetching feed"});
}
})

module.exports=userRouter;