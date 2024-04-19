"use server"
import {v2 as cloudinary} from 'cloudinary';
import path from 'path';


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadFileToCloudianry=async(filePath:string)=>{
  const options:any={
    use_filename:true,
    resource_type:"video",
    folder:"songs",
    invalidate:true
  }
  try{
    const up=await cloudinary.uploader.upload("src/app/_utils/hass.mp3",options)
    console.log(up);
    return {
      public_id:up.public_id,
      original_name:up.original_filename,
      extension:up.original_extension,
      playBackUrl:up.secure_url
    };
  }catch(e){
    console.log(e);
    return {
      err:e
    }
  }
  
}

const getFileFromCloudinary=async(FilePublicId:string)=>{
  const options={
    type:"fetch",
    resource_type: "video", transformation: [
    {audio_codec: "mp3", bit_rate: "44k"}
    ]
  }
  try{
    const file=cloudinary.url(FilePublicId,options);
    if(file){
      return file;
    }
    else{
      throw new Error("File dont exist")
    }
  }catch(e){
    console.log(e);
    return {
      err:e
    }
  }
 
}

export {getFileFromCloudinary,uploadFileToCloudianry};