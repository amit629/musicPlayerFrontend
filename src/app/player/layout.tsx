"use client"
import Navbar from "./_playerComponent/Navbar"
import SideBar from "./_playerComponent/SideBar"
import PlayerHome from "./_playerComponent/PlayerHome"
import React, { createContext, useContext, useState } from "react"
import MusicPlayer from "../_appComponents/MusicPlayer"

export default function PlayerLayout({
    children,
  }: {
    children: any
  }) {
   
    
    return(
        <>
            <div className="h-screen w-screen grid grid-cols-12 bg-[#1b1a1a]" >
              {children}
          </div>
        </>
    )
  }