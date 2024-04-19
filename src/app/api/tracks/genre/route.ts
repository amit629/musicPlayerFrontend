import { NextRequest, NextResponse } from "next/server";
import Genre from "../../../../../mongoose/models/Genre";
import { v4 as uuid } from "uuid";

export async function GET(req:NextRequest) {
    let genre=await Genre.find({});
    return NextResponse.json({
        genres:genre
    });
}

export async function POST(req:NextRequest){
    let {name}:any=await req.json();
    console.log(name)
    if(!name){
        return NextResponse.json({
            isError: true,
            message:"please provide a genre name"
        })
    }
    const genre=new Genre({
        genreId:uuid(),
        genreName:name
    });
    let resp=await genre.save();
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
