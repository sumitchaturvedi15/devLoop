const mongoose=require("mongoose");

const connectionRequestSchema= new mongoose.Schema({
    fromUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    toUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        required:true,
        enum:{
            values:["ignored", "interested", "accepted", "rejected"],
            message:"Error Occured While Sending The Request"
        }
    }
},
{
    timestamps:true,
})

const ConnectionRequest = mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports=ConnectionRequest;