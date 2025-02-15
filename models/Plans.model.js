const { Schema, model } = require("mongoose");

const plansSchema = new Schema(

    {
        user:{
                type:Schema.Types.ObjectId,
                ref:"User"
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
                enum:["daily", "weekly", "monthly"]
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
const Plan = model("Plans", plansSchema);

module.exports = Plan;
