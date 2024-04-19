import NextAuth, { Account, AuthOptions, Awaitable, Profile } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import dbConnect from "../../../../../mongoose/connect";
import User from "../../../../../mongoose/models/User";
import { authOptions } from "@/app/_utils/authOptions";



export interface signInProps{
  account:Account,
  profile:Profile
}

export interface UserModalProps{
  UserName:string,
  Email:string,
  Password:string,
  Role:string,
  Provider:string,
  Avatar:string,
  save:Function
}

const handler=NextAuth(authOptions)

export {handler as GET,handler as POST}

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