"use client"
import { useSession } from 'next-auth/react';
import React from 'react'

export default function SideBar({bgColor}:{bgColor:string}) {
    const {data}:any=useSession();
  return (
    <div className="h-full w-full rounded-2xl " style={{backgroundColor:bgColor}}>
          <h1 className="text-[#7D8994] text-5xl text-center font-bold px-6 py-4"> MusicAL </h1>
      </div>

  )
}
