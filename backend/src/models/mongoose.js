const mongoose=require("mongoose");
const validator=require("validator");

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim: true
    },
    lastName:{
        type:String,
        required:true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("Enter Valid Email")
            }
        }
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(val) {
            const types = ["male", "female", "other"];
            if (!types.includes(val.toLowerCase())) {
                throw new Error("Enter valid gender: Male, Female or Other");
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
    },
    skills:{
        type:[String],
    },
    about:{
        type:String,
        maxlength: 100
    },
    height:{
        type:Number
    },
    languages:{
        type:[String]
    },
    university:{
        type:String,
        default:""
    },
    school:{
        type:String,
        default:""
    },
    company:{
        type:String,
        default:""
    },
    location:{
        type:String,
        default:""
    },
    internships:{
        type:[String],
        default:[]
    },
    fullTimeJobs:{
        type:[String],
        default:[]
    },
    projects:{
        type:[String],
        default:[]
    },
    github:{
        type:String,
        default:""
    },
    experience:{
        type:Number,
        default:0}
},
{
    timestamps:true
})

const User=mongoose.model('User',userSchema);
module.exports=User;