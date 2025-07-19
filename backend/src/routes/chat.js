const express=require("express");
const chatRouter=express.Router();
const userAuth=require("../utils/userAuth");
const Chat = require("../models/chat");


chatRouter.get("/chat/:targetUser",userAuth,async(req,res)=>{
    try{
        const userId=req.user._id;
        const targetUser=req.params.targetUser;
        let chat= await Chat.findOne({
            participants:{$all:[userId,targetUser]}
        }).populate({
            path: "messages.senderId",
            select: "firstName lastName"
        })
        if(!chat){
            chat=new Chat({
                participants:[userId,targetUser],
                messages:[]
            });
            await chat.save();
        }
        res.json(chat);
    }catch(err){
        res.status(500).json({ error: "Internal server error" });
    }
})

module.exports = chatRouter;