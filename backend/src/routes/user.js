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
        }).populate("fromUser",["firstName", "lastName", "age", "gender", "about", "skills","photoUrl"]);
        res.json(data)
    }
    catch(err){
        res.send("Unable to fetch requests");
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const data = await ConnectionRequest.find({
      $or: [
        { fromUser: user._id, status: "accepted" },
        { toUser: user._id, status: "accepted" }
      ]
    })
      .populate("fromUser", [
        "firstName", "lastName", "photoUrl", "skills", "languages", "about", "gender", "age", "height"
      ])
      .populate("toUser", [
        "firstName", "lastName", "photoUrl", "skills", "languages", "about", "gender", "age", "height"
      ]);

    // Filter out records where populated user is null (i.e., user was deleted)
    const connectionData = data
      .filter(row => row.fromUser && row.toUser)
      .map(row => {
        if (row.fromUser._id.toString() === user._id.toString()) {
          return row.toUser;
        }
        return row.fromUser;
      });

    res.json(connectionData);
  } catch (err) {
    console.error("Error fetching connections:", err);
    res.status(500).send("Unable to fetch connections");
  }
});


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
        }).select("firstName lastName photoUrl age gender skills languages height location university school company internships fullTimeJobs projects github experience about").skip(skip).limit(10);
        res.send(users);
    }
    catch(err){
    res.status(500).send({ error: "Error in fetching feed"});
}
})

module.exports=userRouter;