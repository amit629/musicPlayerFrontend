'use client'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [genres,setGenres]=useState<string[]>([]);
  const [genInp,setGenInp]=useState('');
  let getGenre=async()=>{
    const resp=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/tracks/genre`,{
      method:'GET',
      headers:{
        "Content-Type": "application/json",
      }
    })
    const gen=await resp.json();
    // console.log(gen)
    setGenres(gen.genres);
    
  }
  const addGenre=async(ev:any)=>{
    let gener=genres.filter((ele:any)=>{
      return ele.genreName==genInp
    })
    console.log(gener)
    if(gener.length!=0){
      alert('same genre exist');
      return;
    }
    if(genInp.length>0){
      const resp=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/tracks/genre`,{
        method:'POST',
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify({name:genInp})
      })
      const gen=await resp.json();
      console.log(gen)
      if(gen.isError==false){
        getGenre();
      }
    }
    // console.log(genres)
    // console.log(genres.includes(genInp))

  }
  useEffect(()=>{
    getGenre();
  },[])

  return (
    
    <div className='h-full w-full grid grid-cols-2 bg-[#E7E7E7]' >
        <div className="bg-red-200">
            <div className="bg-green-500 relative" style={{height:'670px',width:'90%',top:"5%",left:'5%',overflowY:'auto'}}>
              {
                genres.length>0?(
                  genres.map((gen:any,index)=>{
                    return(
                      <div key={index}>{gen.genreName}</div>
                    )
                  })
                ):(
                  <h1>no genres</h1>
                )
              }
            </div>
        </div>
        <div className="bg-green-200 flex justify-center items-center">
            <div className='bg-red-500 p-3' style={{height:'55%',width:'55%'}}>
                <form className="h-full w-full d-flex flex-col items-center justify-center" onSubmit={(e)=>{e.preventDefault();}} >
                  <input type="text" className="" onChange={(e)=>{setGenInp(e.target.value.toLowerCase().trim())}}></input><br />
                  <button className="bg-black hover:bg-green-500 text-green-500 hover:text-black font-extrabold  py-2 px-4 rounded-3xl w-2/5 border-2 border-green-500  hover:border-black" onClick={addGenre}>Add Genre</button><br />
                </form>
            </div>
        </div>
    </div>
  )
}

export default page;