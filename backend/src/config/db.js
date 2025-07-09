const mongoose=require("mongoose");

const connectDB= async ()=>{
    await mongoose.connect(
        "mongodb+srv://sumitchaturvedi15:Niranjan123@sniredb.rbgpxdc.mongodb.net/devLoop"
    )
}
module.exports=connectDB;