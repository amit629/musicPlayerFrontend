"use client"
import { useRouter } from 'next/navigation'
import React, { useState,SyntheticEvent, useRef, useEffect } from 'react'

const page = () => {
  const [audioFileAttributes,setAudioFileAttributes]=useState({
      fileName:'',
      fileType:''
  })
  const [imageFileAttributes,setImageFileAttributes]=useState({
    fileName:'',
    fileType:''
  })
  const [imageFile,setImageFile]=useState('');
  const [audioFile,setAudioFile]=useState('');
  const imageRef:any=useRef();
  const [selectedArtists,setSelectedArtists]:any=useState([])
  const [selectedGenre,setSelectedGenre]:any=useState([])
  const [genres,setGenres]:any=useState([]);
  const [artists,setArtists]:any=useState([]);
  const [TrackAttributes,setTrackAttributes]:any=useState({
    title:'',
    releaseDate:'',
    language:''
  })


  const getGenreFromDatabase=async()=>{
    const resp=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/tracks/genre`,{
      method:'GET',
      headers:{
        "Content-Type": "application/json",
      }
    })
    const gen=await resp.json();
    const sortedGen=gen.genres.sort(function (a:any, b:any) {
      if (a.genreName < b.genreName) {
        return -1;
      }
      if (a.genreName > b.genreName) {
        return 1;
      }
      return 0;
    });
    setGenres(sortedGen);
  }
  const getArtistsFromDatabase=async()=>{
    const resp=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/tracks/artist`,{
      method:'GET',
      headers:{
        "Content-Type": "application/json",
      }
    })
    const art=await resp.json();
    const sortedArtist=art.artists.sort(function (a:any, b:any) {
      if (a.artistName < b.artistName) {
        return -1;
      }
      if (a.artistName > b.artistName) {
        return 1;
      }
      return 0;
    });
    setArtists(sortedArtist);
  }


  useEffect(()=>{
    getGenreFromDatabase();
    getArtistsFromDatabase();
  },[])

  const router=useRouter();
  const updateSelectedGenres=(e:SyntheticEvent<HTMLSelectElement>)=>{
    let selectOption=e.currentTarget.value;
    if(!selectedGenre.includes(selectOption) && selectOption!=""){
      setSelectedGenre((prev:any)=>{
        return [
          ...prev,
          selectOption
        ]
      })
    }
  }
  const updateSelectedArtists=(e:SyntheticEvent<HTMLSelectElement>)=>{
    let selectOption=e.currentTarget.value;
    if(!selectedArtists.includes(selectOption) && selectOption!=""){
      setSelectedArtists((prev:any)=>{
        return [
          ...prev,
          selectOption
        ]
      })
    }
  }
  
  const removeArt=(ele:string)=>{
    let eleInd=selectedArtists.indexOf(ele);
    console.log(eleInd);
    setSelectedArtists((prev:Array<String>)=>{
      return prev.filter((currEle:String)=>{
        return currEle!=ele;
      });
    })
  }
  const removeGen=(ele:string)=>{
    let eleInd=selectedGenre.indexOf(ele);
    console.log(eleInd);
    setSelectedGenre((prev:Array<String>)=>{
      return prev.filter((currEle:String)=>{
        return currEle!=ele;
      });
    })
  }
  const changeImageName=(e:any)=>{
    if(e.target.files[0]==undefined) return;
    if(e.target.files[0].size>104857600){
      alert('file size to Large')
      return;
    }
    // console.log(imageRef.current.target)
    // console.log(__dirname)
    console.log(e.target.files[0]);
    console.log(URL.createObjectURL(e.target.files[0]))
    // console.log(imageRef.current)
    
    setImageFileAttributes({
      fileName:e.target.files[0].name,
      fileType:e.target.files[0].type
    })
    imageRef.current.src=URL.createObjectURL(e.target.files[0])
    setImageFile(e.target.files[0])
  }
  const changeAudioName=(e:any)=>{
    if(e.target.files[0]==undefined) return;
    if(e.target.files[0].size>104857600){
      alert('file size to Large')
      return;
    }       
    setAudioFileAttributes({
      fileName:e.target.files[0].name,
      fileType:e.target.files[0].type
    })
    setAudioFile(e.target.files[0])
    console.log(e)
  }
  const chageInFormFields=(ev:any)=>{
    setTrackAttributes({
      ...TrackAttributes,
      [ev.target.name]:ev.target.name=="language"?ev.currentTarget.value:ev.target.value
    })
  }
  const AddSong=async(e:any)=>{
    e.preventDefault();
    console.log(TrackAttributes)
    if(!imageFile || !audioFile || !audioFileAttributes || !imageFileAttributes || selectedGenre.length==0 || selectedArtists.length==0 || TrackAttributes.title.length==0 || TrackAttributes.releaseDate.length==0 || TrackAttributes.language.length==0) {alert('fill all fields');return;}
    const songData=new FormData();
    songData.append('image',imageFile);
    songData.append('audio',audioFile);
    songData.append('audioAttributes',JSON.stringify(audioFileAttributes));
    songData.append('imageAttributes',JSON.stringify(imageFileAttributes));
    songData.append('selectedGenre',JSON.stringify(selectedGenre));
    songData.append('selectedArtist',JSON.stringify(selectedArtists));
    songData.append('trackattributes',JSON.stringify(TrackAttributes));

    const resp=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/tracks`,{
      method:'POST',
      body:songData
    })
    const data=await resp.json();

    if(!data.isError){
      alert('song added successfully');
      setTimeout(()=>{
        window.location.reload();
      },500)
    }
    
  }
  return (
    <form className='h-full w-full bg-[#E7E7E7] grid grid-cols-2' onSubmit={AddSong} encType="multipart/form-data">
        <div className=' px-16 py-5'>
          <div className='h-full w-full border-2 border-solid border-black px-12 py-6 bg-white' style={{borderRadius:'40px'}}>
              <h1 className="text-5xl font-extrabold ">Music Attributes</h1>
              <div className='mt-10'>
                <label htmlFor="" className='inline-block mb-1'>Title</label><br />
                <input type="text" name="title" className='w-full h-10 rounded-xl border-2 border-black' onChange={chageInFormFields}/>
              </div>
              <div className='mt-5'>
                <label htmlFor="" className='inline-block mb-1'>Release Date</label><br />
                <input type="date" name='releaseDate' className='w-full h-10 rounded-xl border-2 border-black' max={new Date().toISOString().split('T')[0]} onChange={chageInFormFields}/>
              </div>
              <div className='mt-5'>
                <label htmlFor="" className='inline-block mb-1'>Artists</label><br />
                <select name="" className='w-full h-10 rounded-xl border-2 border-black' onChange={updateSelectedArtists}>
                  <option value="">Select Artists</option>
                  {
                      artists.map((ele:any)=>{
                          return<option value={ele.artistName} key={ele.artistId}>{ele.artistName.charAt(0).toUpperCase()+ele.artistName.slice(1)}</option>
                      })
                  }
                </select>
                <div className='w-full h-14 rounded border border-black mt-2 py-1 px-2' style={{overflow:'auto'}}>
                  {
                    selectedArtists.map((ele:string,index:number)=>{
                      return(
                        
                          <span className='inline-block border border-red-500 m-1 px-3 py-1' key={index}> {ele} <button key={Math.random()+index+Date.now()} onClick={()=>{removeArt(ele)}}> x </button></span>
                        
                      )
                    })
                  }
                </div>
              </div>
              <div className='mt-5'>
                <label htmlFor="" className='inline-block mb-1'>Genre</label><br />
                <select name="" className='w-full h-10 rounded-xl border-2 border-black' onChange={updateSelectedGenres}>
                  <option value="">Select Genre</option>
                  {
                      genres.map((ele:any)=>{
                          return<option value={ele.genreName} key={ele.genreId}>{ele.genreName.charAt(0).toUpperCase()+ele.genreName.slice(1)}</option>
                      })
                  }
                </select>
                <div className='w-full h-14 rounded border border-black mt-2 py-1 px-2' style={{overflow:'auto'}}>
                {
                    selectedGenre.map((ele:string,index:number)=>{
                      return(
                          <span className='inline-block border border-red-500 m-1 px-3 py-1' key={index}> {ele} <button key={Math.random()+index+Date.now()} onClick={()=>{removeGen(ele)}}> x </button></span>
                      )
                    })
                  }
                </div>
              </div>

              <div className='mt-5'>
                  <label htmlFor=""></label>
                  <label htmlFor="" className='inline-block mb-1'>Language</label><br />
                  <select name="language" className='w-full h-10 rounded-xl border-2 border-black' onChange={chageInFormFields}>
                    <option value="">Select Language</option>
                    <option value="hindi">Hindi</option>
                    <option value="english">English</option>
                    <option value="punjabi">Punjabi</option>
                    <option value="bhojpuri">Bhojpuri</option>
                  </select>
              </div>
          </div>
        </div>

                  
        <div className="grid grid-rows-12">   

          <div className="row-span-5 p-2 px-10 pt-6">

              <div className='h-full w-full border-2 border-solid border-black px-7 pt-6 bg-white' style={{borderRadius:'40px'}}>
                  <div className='w-full px-6'>
                    <h1 className="text-3xl font-extrabold text-center">Image Upload</h1>
                    <label htmlFor="uploadedImage" className="flex justify-center items-center rounded-lg text-2xl w-full h-10 border-2 border-solid border-black InputUploadLabel font-bold mt-5">
                      {
                        imageFileAttributes.fileName?"Upload Another File":"Upload"
                      }
                    </label>
                    <input 
                      id='uploadedImage'
                      type="file"
                      className='InputUploadButton'
                      placeholder='Upload'
                      accept="image/*"
                      onChange={changeImageName}
                    />    
                  </div>   
                  <div className='w-full h-36  pt-3 ps-1'>
                
                    <img ref={imageRef} className={`inline-block rounded-2xl p-2 ms-28 ${imageFileAttributes.fileName?'inline-block':'hidden'}`} style={{height:'100%',width:'50%'}}></img>
                    <h1 className={`${imageFileAttributes.fileName?'hidden':'inline-block'}`}>No Image Selected</h1>
                   
                  </div>
                  
              </div>
          </div>

          <div className="row-span-5  p-2 px-10">
            <div className='h-full w-full border-2 border-solid border-black px-7 py-6 bg-white' style={{borderRadius:'40px'}}>
                <div className='w-full px-6'>
                  <h1 className="text-3xl font-extrabold text-center">Music File Upload</h1>
                  <label htmlFor="uploadAudio" className="flex justify-center items-center rounded-lg text-2xl w-full h-10 border-2 border-solid border-black InputUploadLabel font-bold mt-5">
                    {
                      audioFileAttributes.fileName?"Upload Another File":"Upload"
                    }
                  </label>
                  <input 
                      id='uploadAudio'
                      type="file"
                      className='InputUploadButton'
                      placeholder='Upload'
                      accept="audio/*"
                      onChange={changeAudioName}
                    />  
                </div>
                
                <div className='w-full h-30 py-3 px-1'>
                    <div className='w-full my-2 text-xl'>
                      <span className='inline-block w-2/5'>Music File Name</span>
                      <span className='inline-block bg-gray-300  w-3/5'>
                        {
                          audioFileAttributes.fileName?audioFileAttributes.fileName:'Select File'
                        }
                      </span>
                    </div>
                    <div className='w-full my-2 text-xl'>
                      <span className='inline-block w-2/5'>Music File Type</span>
                      <span className='inline-block bg-gray-300  w-3/5'>
                        {
                          audioFileAttributes.fileType?audioFileAttributes.fileType:'Select File'
                        }  
                      </span> 
                    </div>
                  </div>
            </div>
          </div>
            
          <div className="row-span-2 flex justify-center items-center">
              <button type='submit' className="bg-black hover:bg-green-500 text-green-500 hover:text-black font-extrabold  py-2 px-4 rounded-3xl w-2/5 border-2 border-green-500  hover:border-black">Add</button><br />
              
          </div>
        </div>
    </form>
  )
}

export default page