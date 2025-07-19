const express=require("express");
const app=express();
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const cors=require("cors");
require('dotenv').config()
const http = require("http");
const server = http.createServer(app);
const initializeSocket = require("./utils/socket");

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
    }
));
const connectDB=require("./config/db");

const authRouter=require("./routes/auth");
app.use("/",authRouter);

const profileRouter=require("./routes/profile");
app.use("/",profileRouter);

const requestRouter=require("./routes/request");
app.use("/",requestRouter);

const chatRouter=require("./routes/chat");
app.use("/",chatRouter);

const userRouter=require("./routes/user");

app.use("/",userRouter);
initializeSocket(server);


connectDB().then(()=>{
    console.log("Successfully connected with the database");
    // app.use((req,res)=>{
    //     res.send("Checking Database & server connection");
    // })
    server.listen(process.env.PORT, ()=>{
        console.log("Connected with server successfully");
    });
})
.catch((err)=>{
    console.log("Failed to connect with the database")
})