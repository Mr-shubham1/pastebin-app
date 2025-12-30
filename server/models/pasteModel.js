import mongoose from "mongoose";
const pasteSchema = new mongoose.Schema({
    paste:{
        type:String,
        required:true,
    },
    expiryDate:{
        type:Date,
        default:null,
        expires:0
    },
    viewsCount:{
        type:Number,
        default:0
    },
    maxViews:{
        type:Number,
        default:null
    }
})
export const Paste = mongoose.model("Paste",pasteSchema);