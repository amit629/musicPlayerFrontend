"use client"
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import MusicPlayer from '../_appComponents/MusicPlayer';
import SideBar from './_playerComponent/SideBar';
import Navbar from './_playerComponent/Navbar';
import PlayerHome from './_playerComponent/PlayerHome';

const page = () => {
    const data=useSession();
    console.log(data)
    const Router=useRouter()
    const [playerState,setPlayerState]=useState({
      Title:''
    })
 
    if(data.status=='unauthenticated'){
      return (
        <>
          <h1>Ae Vediya Login Karle</h1>
          <button onClick={()=>Router.push('/auth/login')}>Login</button>
        </>
      )
    }
    
  return (
    <>
              {/* <div className="col-span-2">
                  
              </div> */}
              {/* <div className="col-span-12 h-[70px]">
                  <div className="h-full">
                    <Navbar/>
                  </div>
                  <PlayerHome changeTrack={setPlayerState}/>
              </div> */}

             
                <div className={`col-span-3 ${playerState.Title.length!=0?'calculated-height':'h-full'}  w-full p-1 py-3`}>
                  <SideBar bgColor={'#000'}/>
                </div>
                <div className='col-span-9 w-full px-2 py-3 grid grid-rows-12'>
                  <div className='w-full h-full row-span-1'>
                    <Navbar bgColor={'#000'}/>
                  </div>
                  <div className={`w-full h-full row-span-11`} style={{overflow:'hidden'}}>
                    <PlayerHome changeTrack={setPlayerState} currTrack={playerState}/>
                  </div>
                </div>
                {playerState.Title.length!=0 && <div className='h-[100px] w-screen bg-[#000]  fixed top-[87.1%]'>
                  <MusicPlayer trackAttr={playerState}/>
                </div>
                }
    </>
  )
}

export default page