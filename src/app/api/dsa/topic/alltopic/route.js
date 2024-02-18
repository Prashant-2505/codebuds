import connectToDb from "@/database";
import TopicModel from "@/models/topic";
import { NextResponse } from "next/server";


export async function GET() {
    connectToDb()
    try {
        const topics = await TopicModel.find({})
        if (topics) {
            return NextResponse.json({
                success: true,
                message: "topic fetch successfully",
                topics
            })
        }
        else {
            return NextResponse.json({
                success: false,
                message: " unable to find topic",

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