"use client"
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react"

export default function Register(){
    const {data}=useSession();
    const Router=useRouter();
    if(data?.user){
        Router.push('/player')
    }
    const [userData,setUserData]=useState({
        username:'',
        email:'',
        password:''
    })

    const onFieldChange = (e:ChangeEvent)=>{
        const target = e.target as HTMLInputElement;
        setUserData({
         ...userData,
            [target.name]:target.value
        })
    }
    return(
        <>
            <h1 className=" text-3xl font-extrabold">Create Account<img/></h1>
            <button className=" border-2 border-solid border-gray py-2 px-4 text-md rounded-lg mt-8 mb-5" style={{height:'9%',width:'65%'}}><span className="hidden lg:inline">Sign up with Google</span><img src='/GSym.png' style={{height:'80%',display:'inline-block'}} onClick={()=>{signIn('google')}}/></button>
            <div className="flex justify-center items-center w-full mb-4">
                <hr className="inline-block " style={{width:'20%',}}/> &emsp; OR &emsp; <hr className="inline-block w-10" style={{width:'20%'}}/>    
            </div> 
            <div className="my-2 mt-4 flex justify-center" style={{height:'9%',width:'65%'}}>
                <input type="text" placeholder="Name" name="username" onChange={onFieldChange} className="w-full h-full rounded-lg text-xs" style={{border:'2px solid #BABABA',textIndent:'4%'}}/>
            </div>
            <div className="my-2 flex justify-center" style={{height:'9%',width:'65%'}}>
                <input type="email" placeholder="Email" name="email" onChange={onFieldChange} className=" w-full h-full rounded-lg text-xs" style={{border:'2px solid #BABABA',textIndent:'4%'}}/>
            </div>
            <div className="my-2 flex justify-center" style={{height:'9%',width:'65%'}}>
                <input type="password" placeholder="Password" name="password" onChange={onFieldChange} className=" w-full h-full rounded-lg text-xs" style={{border:'2px solid #BABABA',textIndent:'4%'}}/>
            </div>
            <button className="text-white bg-orange-500 py-2 px-4 text-md rounded-full w-3/4 mt-7" style={{height:'9%',width:'65%'}}>Create Account</button>
            <span className="mt-2">Already have an account? <Link href={'/auth/login'} className=" text-orange-500 ">Log In</Link></span>
        </>
    )
}