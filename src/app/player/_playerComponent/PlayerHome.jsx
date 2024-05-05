"use client"
import React, { useEffect, useState } from 'react'

export default function PlayerHome({changeTrack,currTrack}) {

    
    const [serverData,setServerData]=useState([]);

    useEffect(()=>{
        const getServerData=async()=>{
          const resp=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/tracks`,{
            method:'GET',
            headers:{
              "Content-Type": "application/json",
            }
          })
          if(resp.ok){
            const data=await resp.json();
            console.log(data);
            setServerData(data.tracksData)
          }
        }
        getServerData();
      },[])

      const trackChangeEvent=(ele)=>{
        changeTrack(ele);
      }

  return (
    <div className={`w-full bg-[#121212] py-5 rounded-xl mt-3 ${currTrack.Title.length!=0?'calculated-height2':'calculated-height3'}`} >
        <div className='w-full h-full' style={{overflowY:'scroll'}}>

            <div className="  h-[312.438px] mt-3 p-2  w-[100%] rounded-xl" style={{display:'inline-block',whiteSpace:'nowrap',overflow:'hidden'}}>
                <div className='h-[5%] flex flex-row justify-between items-center px-2 pe-7'>
                    <h1 className='text-white mx-2' style={{fontSize: '1.5em' ,fontWeight:'bolder'}}>Popular</h1>
                    <span className='text-[#b3b3b3] underline'>show all</span>
                </div>
                <div className='flex flex-row justify-evenly mt-2 items-center h-[95%] w-[100%] py-3'>
                {
                    serverData.map((ele,index)=>{
                        return( 
                            <div className="h-full text-white rounded-lg flex flex-col py-1 mx-2  hover:bg-[#1a1a1a]" key={`KeyNo-${Math.floor(Math.random()*1000)+index}${Date.now()}${Math.round(Math.random()*10)}`} style={{width:'200px',display:'inline-block'}} onClick={()=>{trackChangeEvent(ele)}}>
                                <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/sendImage/${ele.FileImageAttributes.FileName}`} alt={ele.title} style={{height:'75%',width:'100%',padding:'10px'}}/>
                                <div className='mt-1 ms-3 font-extrabold text-md overflow-hidden'>
                                    {ele.Title.substring(0,20)}...
                                </div>
                                <div className='ms-3 font-light text-xs'>
                                    {ele.Artist.join(" & ")}
                                </div>
                            </div>
                        ) 
                    })
                }
                </div>
            </div>

            <div className="  h-[312.438px] mt-3 p-2  w-[100%] rounded-xl" style={{display:'inline-block',whiteSpace:'nowrap',overflow:'hidden'}}>
                <div className='h-[5%] flex flex-row justify-between items-center px-2 pe-7'>
                    <h1 className='text-white mx-2' style={{fontSize: '1.5em' ,fontWeight:'bolder'}}>Popular Genre</h1>
                    <span className='text-[#b3b3b3] underline'>show all</span>
                </div>
                <div className='flex flex-row justify-evenly mt-2 items-center h-[95%] w-[100%] py-3'>
                {
                    serverData.map((ele,index)=>{
                        return( 
                            <div className="h-full text-white rounded-lg flex flex-col py-1 mx-2  hover:bg-[#1a1a1a]" key={`KeyNo-${Math.floor(Math.random()*1000)+index}${Date.now()}${Math.round(Math.random()*10)}`} style={{width:'200px',display:'inline-block'}} onClick={()=>{trackChangeEvent(ele)}}>
                                <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/sendImage/${ele.FileImageAttributes.FileName}`} alt={ele.title} style={{height:'75%',width:'100%',padding:'10px'}}/>
                                <div className='mt-1 ms-3 font-extrabold text-md overflow-hidden'>
                                    {ele.Title.substring(0,20)}...
                                </div>
                                <div className='ms-3 font-light text-xs'>
                                    {ele.Artist.join(" & ")}
                                </div>
                            </div>
                        ) 
                    })
                }
                </div>
            </div>

            <div className="  h-[312.438px] mt-3 p-2  w-[100%] rounded-xl" style={{display:'inline-block',whiteSpace:'nowrap',overflow:'hidden'}}>
                <div className='h-[5%] flex flex-row justify-between items-center px-2 pe-7'>
                    <h1 className='text-white mx-2' style={{fontSize: '1.5em' ,fontWeight:'bolder'}}>Popular Artist</h1>
                    <span className='text-[#b3b3b3] underline'>show all</span>
                </div>
                <div className='flex flex-row justify-evenly mt-2 items-center h-[95%] w-[100%] py-3'>
                {
                    serverData.map((ele,index)=>{
                        return( 
                            <div className="h-full text-white rounded-lg flex flex-col py-1 mx-2  hover:bg-[#1a1a1a]" key={`KeyNo-${Math.floor(Math.random()*1000)+index}${Date.now()}${Math.round(Math.random()*10)}`} style={{width:'200px',display:'inline-block'}} onClick={()=>{trackChangeEvent(ele)}}>
                                <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/sendImage/${ele.FileImageAttributes.FileName}`} alt={ele.title} style={{height:'75%',width:'100%',padding:'10px'}}/>
                                <div className='mt-1 ms-3 font-extrabold text-md overflow-hidden'>
                                    {ele.Title.substring(0,20)}...
                                </div>
                                <div className='ms-3 font-light text-xs'>
                                    {ele.Artist.join(" & ")}
                                </div>
                            </div>
                        ) 
                    })
                }
                </div>
            </div>

        </div>
    </div>
  )
}
