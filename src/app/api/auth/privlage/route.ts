import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../mongoose/models/User";

export async function POST(req:NextRequest) {
    let data=await req.json();
    if(!data){
        return NextResponse.json({
            isAdmin:false
        })
    }
    const user=await User.findOne({Email:data.email});
    let ret:Boolean=false;
    if(user.Role=="admin" || user.Role=="artist"){
        ret=true;
    }   
    console.log(ret)
    return NextResponse.json({
        isAdmin:ret
    });
}