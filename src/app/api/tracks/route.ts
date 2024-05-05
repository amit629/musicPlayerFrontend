import { NextRequest, NextResponse } from "next/server";
import TrackModal from "../../../../mongoose/models/TrackModal";
import {v4 as uuid} from 'uuid';
import path from "path";
import { writeFile } from "fs/promises";
import { writeFileSync } from "fs";
import { NodeNextResponse } from "next/dist/server/base-http/node";
interface trackAttributesProps{
    title:string,
    releaseDate:string,
    language:string
}
export const dynamic = 'force-dynamic';
export async function GET(req:NextRequest) {
    // return new Response(JSON.stringify({hello:'world'}))
    let tracks=await TrackModal.find({}).limit(5);
    return NextResponse.json({
        tracksData:tracks
    });
}

export async function POST(req:NextRequest){
    let data=await req.formData()
    // data.forEach((ele)=>{
    //     console.log(ele)
    // })
    // return NextResponse.json({
    //     message:';ll'
    // })
    let audioFile:File | null=data.get('audio') as unknown as File;
    let imageFile:File | null=data.get('image') as unknown as File;
    let imageType:string=imageFile.type;
    let audioType:string=audioFile.type;
    let genres:string[] | null=JSON.parse(data.get('selectedGenre') as any) as unknown as string[];
    let artists:string[] | null=JSON.parse(data.get('selectedArtist') as any) as unknown as string[];
    let trackAttributes:trackAttributesProps | null=JSON.parse(data.get('trackattributes') as any) as unknown as trackAttributesProps;

    if(!audioFile || !imageFile || genres.length == 0 || artists.length == 0 || trackAttributes.language.length==0 || trackAttributes.title.length==0 || trackAttributes.releaseDate.length==0) {
        return NextResponse.json({
            isError: true,
            message: "data missing"
        })
    }
    console.log(audioFile);
    console.log(imageFile)
    console.log(genres);
    console.log(artists)
    console.log(trackAttributes)
    const imageBytes=await imageFile.arrayBuffer();
    const imageBuffer=Buffer.from(imageBytes);

    const audioBytes=await audioFile.arrayBuffer();;
    const audioBuffer=Buffer.from(audioBytes);


    const imageFileName=uuid().toString()+new Date().getTime().toString();
    const audioFileName=uuid().toString()+new Date().getTime().toString();
    // console.log(fileName,__dirname,__filename,);
    // console.log(path.join(__dirname,'_image'));

    // console.log(process.cwd());

    const imagePath=path.join(process.cwd(),'image',imageFileName+'.'+imageFile.type.split('/')[1]);
    const audioPath=path.join(process.cwd(),'audio',audioFileName+'.mp3');
    
    // console.log(imagePath,audioPath);

     await writeFile(imagePath,imageBuffer);
     await writeFile(audioPath,audioBuffer);

    return NextResponse.json({
        isError: false,
        message:"files Uploaded successfully"
    });
}
