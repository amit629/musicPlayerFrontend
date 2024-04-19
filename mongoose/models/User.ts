import mongoose,{model, models} from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    Username: {
      type: String,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
    },Role:{
      type:String,
      default:'user'
    },
    Provider:{
      type:String,
      default:'credentials'
    },
    Avatar:{
      type:String,
      default:'dummyUser.jpg'
    }
  },
  { timestamps: true },
);

export default models.User || model("User", UserSchema);