import User from "../../../mongoose/models/User";
import { signInProps, UserModalProps } from "../api/auth/[...nextauth]/route";

const signInWithOAuth=async({account,profile}:signInProps)=>{
    const user=await User.findOne({Email:profile.email});
    if(user)return true;
    const newUser:UserModalProps=new User();
    newUser.Email=profile.email??"";
    newUser.UserName=profile.name??"";
    newUser.Avatar=profile.image??"";
    newUser.Provider=account.provider??"";
    await newUser.save();
    console.log({newUser});
    return true;
  }
  
  const signInWithCredentials=()=>{
    
  } 