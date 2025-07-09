const jwt=require("jsonwebtoken");
const User=require("../models/mongoose");

const userAuth=async(req,res,next)=>{
    try{
        const {token}=req.cookies;
        if(!token){
            throw new Error("Token Not Found");
        }
        const decode=await jwt.verify(token,"Keytoken");
        const {_id}=decode;
        const user=await User.findById(_id);
        if(!user){
            throw new Error("User Not Found");
        }
        req.user=user;
        next();
    }
    catch(err){
        res.status(400).send("User Authentication Failed");
    }
}

module.exports=userAuth;