const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    image: {
      type: String,
      default:
        "https://static-00.iconduck.com/assets.00/profile-major-icon-1024x1024-9rtgyx30.png",
    },
    // createdPlans: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Plan",
    //   },
    // ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    myPlans: [
      {
        type: Schema.Types.ObjectId,
        ref: "Plan",
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
