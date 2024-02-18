import connectToDb from "@/database";
import { NextResponse } from "next/server";
import PatternModel from '@/models/pattern'; // Fix typo in import


export async function POST(req) {
    await connectToDb();

    try {
        const { pattern,topic } = await req.json();
        console.log(pattern, topic);

        const existingpattern = await PatternModel.findOne({ pattern }); // Use findOne instead of find
        if (existingpattern) {
            return  NextResponse.json({
                success: false,
                message: "pattern already exists"
            });
        }

        const newpattern = await PatternModel.create({ pattern,topic }); // Pass an object to create
        if (newpattern) {
            return  NextResponse.json({
                success: true, // Fix success status
                message: "pattern created successfully"
            });
        }
    } catch (error) {
        console.error(error); // Log the error
        return  NextResponse.json({
            success: false,
            message: "Unknown error occurred while creating pattern"
        });
    }
}
