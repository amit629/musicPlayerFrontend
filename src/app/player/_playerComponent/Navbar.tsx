"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

export default function Navbar({bgColor}:{bgColor:string}) {
  return (
    <div className='w-full h-full flex justify-end rounded-2xl' style={{backgroundColor:bgColor}}>
        <button className="text-white me-10" onClick={()=>{signOut()}}>Sign Out</button>
    </div>
  )
}
