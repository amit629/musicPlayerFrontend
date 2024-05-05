"use client"
import React, { useEffect, useState } from 'react'

const page = () => {

  const [artist,setArtist]=useState<string[]>([]);
  const [artInp,setArtInp]=useState('');
  let getArtist=async()=>{
    const resp=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/tracks/artist`,{
      method:'GET',
      headers:{
        "Content-Type": "application/json",
      }
    })
    const gen=await resp.json();
    console.log(gen)
    setArtist(gen.artists);
    
  }
  const addArtist=async(ev:any)=>{
    let artr=artist.filter((ele:any)=>{
      return ele.artistName==artInp
    })
    console.log(artr)
    if(artr.length!=0){
      alert('same artist exist');
      return;
    }
    if(artInp.length>0){
      const resp=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/tracks/artist`,{
        method:'POST',
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify({name:artInp})
      })
      const gen=await resp.json();
      console.log(gen)
      if(gen.isError==false){
        getArtist();
      }
    }
    // console.log(artist)
    // console.log(artist.includes(artInp))

  }
  useEffect(()=>{
    getArtist();
  },[])


  return (
    <div className='h-full w-full grid grid-cols-2 bg-[#E7E7E7]'>
        <div className="bg-red-200">
            <div className="bg-green-500 relative" style={{height:'670px',width:'90%',top:"2%",left:'5%',overflowY:'auto',scrollbarWidth:'thin',padding:'10px'}}>
              {
                  artist!=undefined && artist.length>0?(
                    artist.map((gen:any,index)=>{
                      return(
                        <div key={gen.artistId} className='m-0 p-0'>{gen.artistName}</div>
                      )
                    })
                  ):(
                    <h1>No Artists</h1>
                  )
              }
            </div>
        </div>
        <div className="bg-green-200 flex justify-center items-center">
            <div className='bg-red-500' style={{height:'55%',width:'55%'}}>
                <form className="h-full w-full d-flex flex-col items-center justify-center" onSubmit={(e)=>{e.preventDefault();}} >
                  <input type="text" className="" onChange={(e)=>{setArtInp(e.target.value.toLowerCase().trim())}}></input><br />
                  <button className="bg-black hover:bg-green-500 text-green-500 hover:text-black font-extrabold  py-2 px-4 rounded-3xl w-2/5 border-2 border-green-500  hover:border-black" onClick={addArtist}>Add Artist</button><br />
                </form>
            </div>
        </div>
    </div>
  )
}

export default page