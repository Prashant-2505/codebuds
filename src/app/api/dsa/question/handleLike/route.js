import connectToDb from "@/database"
import QuestionModel from "@/models/question"
import { NextResponse } from "next/server"

export  async function POST(req) {
    const { like, id } = await req.json();
    console.log(like, id);

    try {
        connectToDb();
        const updatedQuestion = await QuestionModel.findByIdAndUpdate(id, { like }, { new: true });

        return NextResponse.json({
            success: true,
            like: updatedQuestion.like
        });
    } catch (error) {
        // Handle error appropriately
        console.error(error);

        return NextResponse.json({
            success: false,
            error: "An error occurred while updating the question."
        });
    }
}
