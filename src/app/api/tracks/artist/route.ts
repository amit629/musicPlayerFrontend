import { NextRequest, NextResponse } from "next/server";
import Artists from "../../../../../mongoose/models/Artists";
import { v4 as uuid } from "uuid";

export async function GET(req:NextRequest) {
    let ArtistData=await Artists.find({});
    return NextResponse.json({
        isError:false,
        artists:ArtistData
    });
}

export async function POST(req:any){
    
    let {name}=await req.json();
    if(!name){
        return NextResponse.json({
            isError: true,
            message:"please provide a artist name"
        })
    }
    const artist=new Artists({
        artistId:uuid(),
        artistName:name
    });
    let resp=await artist.save();
    if(resp.errors){
        return NextResponse.json({
            isError:true,
            message:resp.errors
        })
    }
    return NextResponse.json({
        isError:false,
        message:resp
    });
}
