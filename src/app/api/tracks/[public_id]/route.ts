import { getFileFromCloudinary, uploadFileToCloudianry } from "@/app/_utils/cloudnary";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "experimental-edge";
export async function GET(req:NextRequest) {
    const name="songs/hass_abl0pz"
    const file=await getFileFromCloudinary(name)
    console.log(file);
    return NextResponse.json({
        mess:file
    })
}
export async function POST(req:NextRequest) {
    // const name="sonsongs/hass_hbwl07gs"
    // const file=await getFileFromCloudinary(name)
    // console.log(file);
    const data=await uploadFileToCloudianry("./hass.mp3");
    return NextResponse.json({
        mess:data
    })
}
