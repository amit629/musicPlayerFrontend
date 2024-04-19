"use client"
import React, { useEffect, useState } from 'react'

export default function PlayerHome({changeTrack,currTrack}) {

    
    const [serverData,setServerData]=useState([]);

    useEffect(()=>{
        const getServerData=async()=>{
          const resp=await fetch('/api/tracks',{
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
    <div className={`w-full ${currTrack.Title.length!=0?'calculated-height2':'calculated-height3'}`} style={{overflowY:'scroll',}}>
        <div className="bg-[#000] h-[50%] mt-3 p-3 py-4 px-0 w-[100%] rounded-xl" style={{display:'inline-block',whiteSpace:'nowrap',overflowX:'auto'}}>
            {
                serverData.map((ele,index)=>{
                    return( 
                        <div className="h-full bg-white rounded-lg flex flex-col py-1 mx-2" key={`KeyNo-${Math.floor(Math.random()*1000)+index}${Date.now()}${Math.round(Math.random()*10)}`} style={{width:'200px',display:'inline-block'}} onClick={()=>{trackChangeEvent(ele)}}>
                            <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/sendImage/${ele.FileImageAttributes.FileName}`} alt={ele.title} style={{height:'70%',width:'100%',padding:'10px'}}/>
                            <div className='mt-1 ms-3 font-extrabold text-2xl overflow-hidden'>
                                {ele.Title.substring(0,10)}...
                            </div>
                            <div className='ms-3 font-light text-xs'>
                                {ele.Artist.join(" & ")}
                            </div>
                        </div>
                    ) 
                })
            }
        </div>
        <div className="bg-[#000] h-[50%] mt-3 p-3 py-4 px-0 w-[100%] rounded-xl" style={{display:'inline-block',whiteSpace:'nowrap',overflowX:'auto'}}>
            {
                serverData.map((ele,index)=>{
                    return( 
                        <div className="h-full bg-white rounded-lg flex flex-col py-1 mx-2" key={`KeyNo-${Math.floor(Math.random()*1000)+index}${Date.now()}${Math.round(Math.random()*10)}`} style={{width:'200px',display:'inline-block'}} onClick={()=>{trackChangeEvent(ele)}}>
                            <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/sendImage/${ele.FileImageAttributes.FileName}`} alt={ele.title} style={{height:'70%',width:'100%',padding:'10px'}}/>
                            <div className='mt-1 ms-3 font-extrabold text-2xl overflow-hidden'>
                                {ele.Title.substring(0,10)}...
                            </div>
                            <div className='ms-3 font-light text-xs'>
                                {ele.Artist.join(" & ")}
                            </div>
                        </div>
                    ) 
                })
            }
        </div>
        <div className="bg-[#000] h-[50%] mt-3 p-3 py-4 px-0 w-[100%] rounded-xl" style={{display:'inline-block',whiteSpace:'nowrap',overflowX:'auto'}}>
            {
                serverData.map((ele,index)=>{
                    return( 
                        <div className="h-full bg-white rounded-lg flex flex-col py-1 mx-2" key={`KeyNo-${Math.floor(Math.random()*1000)+index}${Date.now()}${Math.round(Math.random()*10)}`} style={{width:'200px',display:'inline-block'}} onClick={()=>{trackChangeEvent(ele)}}>
                            <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/sendImage/${ele.FileImageAttributes.FileName}`} alt={ele.title} style={{height:'70%',width:'100%',padding:'10px'}}/>
                            <div className='mt-1 ms-3 font-extrabold text-2xl overflow-hidden'>
                                {ele.Title.substring(0,10)}...
                            </div>
                            <div className='ms-3 font-light text-xs'>
                                {ele.Artist.join(" & ")}
                            </div>
                        </div>
                    ) 
                })
            }
        </div>
        <div className="bg-[#000] h-[50%] mt-3 p-3 py-4 px-0 w-[100%] rounded-xl" style={{display:'inline-block',whiteSpace:'nowrap',overflowX:'auto'}}>
            {
                serverData.map((ele,index)=>{
                    return( 
                        <div className="h-full bg-white rounded-lg flex flex-col py-1 mx-2" key={`KeyNo-${Math.floor(Math.random()*1000)+index}${Date.now()}${Math.round(Math.random()*10)}`} style={{width:'200px',display:'inline-block'}} onClick={()=>{trackChangeEvent(ele)}}>
                            <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/sendImage/${ele.FileImageAttributes.FileName}`} alt={ele.title} style={{height:'70%',width:'100%',padding:'10px'}}/>
                            <div className='mt-1 ms-3 font-extrabold text-2xl overflow-hidden'>
                                {ele.Title.substring(0,10)}...
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
  )
}
