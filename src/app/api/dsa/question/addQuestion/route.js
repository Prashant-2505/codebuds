import connectToDb from "@/database";
import QuestionModel from "@/models/question";
import { NextResponse } from "next/server";

export async function POST(req) {
    console.log("op");
    connectToDb();
    try {
        const { topic, pattern, questionName, questionLink, questionDescription } = await req.json();

        console.log(topic, pattern, questionName, questionLink, questionDescription);

        const existingQuestion = await QuestionModel.findOne({ questionName });

        if (existingQuestion) {
            return NextResponse.json({
                success: false,
                message: "Question already exists"
            });
        }

        const newQuestion = await QuestionModel.create({
            questionName,
            questionLink,
            questionDescription,
            topic,
            pattern
        });

        if (newQuestion) {
            return NextResponse.json({
                success: true,
                message: "question added successfully",
                newQuestion
            });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "server error: while adding new question"
        });
    }
}
