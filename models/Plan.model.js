const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plansSchema = new Schema(

    {
        title:{
                type: String,
                required: true,
        },
        user:{
                type:Schema.Types.ObjectId,
                ref:"User"
        },

        details:{
                type:String,
                required: true
        },

        date:{
                type: Date, 
                default: Date.now
        },

        isPrivate: {
                type: Boolean,
                default: false,
        },

        location:{
                type: String,
                required : true
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
        

    },
    {
       
        timestamps: true,
      }
)
const Plan = mongoose.model("Plan", plansSchema);

module.exports = Plan;
