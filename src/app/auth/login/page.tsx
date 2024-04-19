"use client"

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function Login() {
  let [user,setUser]=useState({
    username:'',
    password:''
  })
  const {data}=useSession();
  const Router=useRouter();
  if(data?.user){
    Router.push('/player')
  }
  const handleFieldChange=(event:ChangeEvent<HTMLInputElement>)=>{
    setUser({
        ...user,
        [event.target.name]:event.target.value
    })
  }
  const handleCredentialSignIn = async()=>{
    if(user.username.length==0 || user.password.length==0){
        alert('Please fill all fields');
        return;
    }
    const res=await signIn('credentials',{
        redirect:false,
        username:user.username,
        password:user.password,
        callbackUrl:'/'
    })
    // console.log(res);
  }
  return (
    <>
        <h1 className=" text-3xl font-extrabold">Sign In<img/></h1>
        <button className=" border-2 border-solid border-gray py-2 px-4 text-md rounded-lg mt-8 mb-5" style={{height:'9%',width:'65%'}} onClick={()=>{signIn('google')}}><span className="hidden lg:inline">Sign up with Google</span><img src='/GSym.png' style={{height:'80%',display:'inline-block'}}/></button>
        <div className="flex justify-center items-center w-full mb-4">
            <hr className="inline-block " style={{width:'20%',}}/> &emsp; OR &emsp; <hr className="inline-block w-10" style={{width:'20%'}}/>    
        </div>
        <div className="my-2 flex justify-center" style={{height:'9%',width:'65%'}}>
            <input type="email" placeholder="Email" name="username" onChange={handleFieldChange} className=" w-full h-full rounded-lg text-xs" style={{border:'2px solid #BABABA',textIndent:'4%'}}/>
        </div>
        <div className="my-2 flex justify-center" style={{height:'9%',width:'65%'}}>
            <input type="password" placeholder="Password" name="password" onChange={handleFieldChange}  className=" w-full h-full rounded-lg text-xs" style={{border:'2px solid #BABABA',textIndent:'4%'}}/>
        </div>
        <button className="text-white bg-orange-500 py-2 px-4 text-md rounded-full w-3/4 mt-7" style={{height:'9%',width:'65%'}} onClick={handleCredentialSignIn}>LOGIN</button>
        <span className="mt-2">Already have an account? <Link href={'/auth/register'} className=" text-orange-500 ">Register</Link></span>
        
                  
    </>
  );
}
