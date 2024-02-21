import connectToDb from "@/database"
import QuestionModel from "@/models/question"
import { NextResponse } from "next/server"

export async function POST(req) {
    const { topic, pattern } = await req.json()
    console.log(topic, pattern)
    connectToDb()
    try {
        const question = await QuestionModel.find({ topic, pattern })
        if (question) {
            return NextResponse.json({
                success: true,
                message: "question fetched successfully",
                question
            })
        }
        else {
            return NextResponse.json({
                success: false,
                message: "client error while fetching question"
            })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "server error while fetching question"
        })
    }
}