"use client"
import { getToken } from "next-auth/jwt";
import {   signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  
  const {data,status}=useSession();
  console.log(data);
  const router = useRouter()
  if(status=='authenticated'){
    router.push('player')
  }
  else{
    router.push('/auth/login')
  }
  return (
      <>

        {/* <MusicPlayer/> */}
      </>
  );
}
