"use client"
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import PlayerProgress from './PlayerProgress';
import Image from 'next/image';
import '../player/_playercss/player.css'

export default function MusicPlayer({trackAttr}:any) {
    // // console.log(trackAttr)
    // console.log(trackAttr.Title.length)
    const musicplayers = useRef<HTMLAudioElement | undefined>(
        typeof Audio !== "undefined" ? new Audio() : undefined
    );
    const [aud]:any=useState(musicplayers.current);
    const [isLoading,setIsLoading]=useState(true);
    const [duration,setDuration]=useState(0);
    const [currTime,setCurrentTime]=useState(0);
    const [play,setPlay]=useState(false);
    const [scroll,setScroll]=useState(20)
    const [countUpdate,setCountUpdate]=useState(false)
    // const [currTrack,setCurrTrack]=useState('kinkin.mp3');
    const [userAudio,setUserAudio]=useState(1.0);
    const [wth,setWth]=useState(0)

    useEffect(()=>{
        console.log('a')
        setCountUpdate(false);
        aud.src=`${process.env.NEXT_PUBLIC_SERVER_URL}/audioTrack/${trackAttr.FileAudioAttributes.FileName}`
        aud.addEventListener('canplaythrough',()=>{
            setDuration(aud.duration);
            aud.volume=userAudio
            setIsLoading(false);
            setPlay(true)
            aud.play()
            
        })

        return()=>{
            aud.removeEventListener('canplaythrough',()=>{
                setDuration(0);
                setIsLoading(true);
                
            })
        }
        
    },[trackAttr]);


    useEffect(()=>{
        aud.addEventListener('timeupdate',()=>{
            setCurrentTime(aud.currentTime)
        })
    },[play])

    useEffect(()=>{
        aud.volume=userAudio
    },[userAudio])

    const updateCnt=async ()=>{
        setCountUpdate(true);   
        const resp=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/track/updateCount/${trackAttr.TrackId}`)
        const data=await resp.json();
        console.log(data);
    }

    useEffect(()=>{
        setWth((currTime/duration)*100);
        console.log(aud.volume)
        if(countUpdate==false && (currTime/duration)*100>15){
            updateCnt();
        }
    },[currTime])

    
    if(isLoading){
        return(
            <>
                <h1>Loading...</h1>
            </>
        )
    }

    const setAudioVolume=(e:ChangeEvent)=>{
        setUserAudio(parseFloat((e.target as HTMLInputElement).value))
    }
    const playAud=(e:any)=>{
        // console.log('hello')
        setPlay(true);
        aud.play()
        
    }
    const pauseAud=(e:any)=>{
        // console.log('hello')
        setPlay(false);
        aud.pause();
        
    }

   
    // let i=20
    // trackAttr.Title.length!=0 && setTimeout(()=>{
    //     refOfScroll.current?.scrollTo(i,0)
    //     i+=20
    //     // console.log() 
    // },100)
   
    return (
        <>

                <div className='h-full w-full  p-2 flex flex-row ' style={{color:'white'}}>
                    <div className='h-[100%] w-[30%] inline-flex items-center '>
                        <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/sendImage/${trackAttr.FileImageAttributes.FileName}`} className='m-0 p-0 inline-block rounded-lg' alt="photo" style={{height:'100%',width:'20%',border:'1px solid white'}}/>
                        <div className='inline-flex flex-col ps-3 justify-end w-[80%]'>
                            {
                                trackAttr.Title.length>23?(
                                    <div className="scrolling-text-container ">
                                        <div className="scrolling-text-inner w-full">
                                            <div className="scrolling-text w-full">
                                                <div className="scrolling-text-item font-extrabold text-lg TrackNameShadow ">{trackAttr.Title}</div>
                                            </div>
                                        </div>
                                    </div>
                                ):(
                                    <div  className="font-extrabold text-lg TrackNameShadow text-nowrap w-[90%]" style={{scrollbarWidth:'none'}}>{trackAttr.Title}</div>
                                )
                            }
                            {/* <marquee  className="font-extrabold text-2xl TrackNameShadow overflow-x-auto overflow-y-hidden scroll text-nowrap w-[90%]" ref={refOfScroll} style={{scrollbarWidth:'none'}}></marquee> */}
                            <span className='text-md'>{trackAttr.Artist.join(' & ')}</span>
                        </div>
                    </div>
                    <div className=' h-[100%] w-[70%] inline-flex flex-col p-1 mt-1'>
                        <div className='h-[20%] w-[95%] '>
                            <PlayerProgress wth={wth} duration={duration} aud={aud}/>
                        </div>
                        <div className='h-[70%] w-[100%] flex justify-center items-center mt-3'>
                            <div className="inline-flex flex-row justify-evenly items-center  h-[100%] w-[12%]">
                                <Image src='/rewind.png' alt='rewind' height={30} width={30} className='h-[80%] w-[70px] px-2'/>
                                {
                                    play?<Image src='/pauseIcon.png' onClick={pauseAud} alt='pause' height={20} width={20}  className='h-[80%] w-[70px] px-2'/>:<Image src='/playIcon.png' onClick={playAud} alt='play' height={20} width={20}  className='h-[80%] w-[70px] px-2'/>
                                }<Image src='/fastforward.png' alt='fast forward' height={20} width={20}  className='h-[80%] w-[70px] px-2'/>
                            </div>
                        <div className='aud inline-flex justify-center items-center ps-14 '>
                            <input type="range" max={1} min={0} step={0.05} defaultValue={userAudio} onChange={setAudioVolume}/>
                        </div>
                        </div>
                    </div>
                    
                </div>
                {/* <div className='h-full w-full grid grid-cols-12' style={{color:'white'}}>
                        <div className='col-span-3 h-full grid-rows-1 p-[10px] grid grid-cols-12'>
                            <div className='col-span-4 h-full'>
                                
                            </div>
                            <div className='col-span-8 h-full'>
                                <div className='flex flex-col  p-2'>
                                    <span className="font-extrabold text-2xl TrackNameShadow ">{trackAttr.Title.substring(0,10)}</span>
                                    <span>{trackAttr.Artist.join(' & ')}</span>
                                </div>
                            </div>
                        </div>
                        <div className='h-full col-span-8 grid grid-rows-2'>
                            <div className="row-span-1 flex justify-center items-center">
                                <div className='h-[50%] w-[98%] '>
                                    <PlayerProgress wth={wth} duration={duration} aud={aud} />
                                </div>
                            </div>
                            <div className="row-span-2 flex justify-center items-center">
                                <div className="flex flex-row justify-around items-center h-[95%] w-[20%]">
                                    <Image src='/rewind.png' alt='rewind' height={20} width={20} className='h-full w-[20%]'/>
                                    <Image src='/playIcon.png' onClick={playAud} alt='play' height={20} width={20}  className='h-full w-[20%]'/>
                                    <Image src='/fastforward.png' alt='fast forward' height={20} width={20}  className='h-full w-[20%]'/>
                                </div>
                                <div className='aud'>
                                    <input type="range" max={1} min={0} step={0.1} defaultValue={1} onChange={setAudioVolume}/>
                                </div>
                            </div>
                            
                        </div>
                </div> */}
        </>
    )
}
