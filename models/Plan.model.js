const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plansSchema = new Schema(

    {
        user:{
                type:Schema.Types.ObjectId,
                ref:"User"
        },

        name:{
                type:String,
                require: true
        },

        details:{
                type:String,
                require: true
        },

        date:{
                type: Date, 
                default: Date.now
        },

        location:{
                type: String,
                require : true
        },

        frequency:{
                type: String,
                enum:["daily", "weekly", "monthly", "once"]
        },

        image:{
                type: String,
                default:"https://static-00.iconduck.com/assets.00/profile-major-icon-1024x1024-9rtgyx30.png"

        },

        attendance:{
                type: Boolean,
                default: false
                
               

        },
        
        comments:{
                type:Schema.Types.ObjectId,
                ref: "Comments"
        }
    

    }
)
const Plan = mongoose.model("Plan", plansSchema);

module.exports = Plan;
