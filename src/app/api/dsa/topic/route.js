import connectToDb from "@/database";
import { NextResponse } from "next/server";
import TopicModel from '@/models/topic'; // Fix typo in import


export async function POST(req) {
    await connectToDb();

    try {
        const { topic } = await req.json();

        const existingTopic = await TopicModel.findOne({ topic }); // Use findOne instead of find
        if (existingTopic) {
            return  NextResponse.json({
                success: false,
                message: "Topic already exists"
            });
        }

        const newTopic = await TopicModel.create({ topic }); // Pass an object to create
        if (newTopic) {
            return  NextResponse.json({
                success: true, // Fix success status
                message: "Topic created successfully"
            });
        }
    } catch (error) {
        console.error(error); // Log the error
        return  NextResponse.json({
            success: false,
            message: "Unknown error occurred while creating topic"
        });
    }
}
