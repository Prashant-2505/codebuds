import connectToDb from "@/database";
import PatternModel from "@/models/pattern";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectToDb()
    try {
        const { topic } = await req.json()
       console.log(topic)
        const pattern = await PatternModel.find({ topic })
        if (pattern) {
            return NextResponse.json({
                success: true,
                message: "Pattern fetched successfully",
                pattern
            })
        }
        else {
            return NextResponse.json({
                success: false,
                message: "error occurred while fetching pattern",

            })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "server error occurred while fetching pattern",

        })
    }
}