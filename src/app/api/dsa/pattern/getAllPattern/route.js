import connectToDb from "@/database";
import PatternModel from "@/models/pattern";
import { NextResponse } from "next/server";


export async function POST(req) {
    connectToDb()
    try {
        const {topic} = await req.json()
        console.log(topic)

        const patterns = await PatternModel.find({topic})
        if (patterns) {
            return NextResponse.json({
                success: true,
                message: "pattern fetch successfully",
                patterns 
            })
        }
        else {
            return NextResponse.json({
                success: false,
                message: " unable to find pattern",

            })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "server error: " + error.message,

        })
    }
}