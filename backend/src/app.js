const express=require("express");
const app=express();
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const connectDB=require("./config/db");

const authRouter=require("./routes/auth");
app.use("/",authRouter);

const profileRouter=require("./routes/profile");
app.use("/",profileRouter);

const requestRouter=require("./routes/request");
app.use("/",requestRouter);

const userRouter=require("./routes/user");
app.use("/",userRouter);

connectDB().then(()=>{
    console.log("Successfully connected with the database");
    // app.use((req,res)=>{
    //     res.send("Checking Database & server connection");
    // })
    app.listen(5000, ()=>{
        console.log("Connected with server successfully");
    });
})
.catch((err)=>{
    console.log("Failed to connect with the database")
})