import connectToDb from "@/database/index";
import { NextResponse } from "next/server";
import UserModel from "@/models/user";


export const dynamic = "force-dynamic";

export async function POST(req) {
    await connectToDb();


    const { name, email, uid } = await req.json();
    if (!name || !email ) {
        return NextResponse.json({
            success: false,
            message: "Please fill all required fields",
        });
    } else {
        try {
            const existingUser = await UserModel.findOne({ email });

            if (existingUser) {
                return NextResponse.json({
                    success: true,
                    message: "Welcome back",
                });
            }

            const newUser = await UserModel.create({
                uid,
                name,
                email,
                password:"google"
            });

            if (newUser) {
                return NextResponse.json({
                    success: true,
                    message: "Account created successfully.",
                    newUser: {
                        name: newUser.name,
                        email: newUser.email,
                        uid: newUser.uid
                    }
                });
            }
        } catch (error) {
            console.error("Error while new user registration:", error);
            return NextResponse.json({
                success: false,
                message: "Something went wrong! Please try again later",
            });
        }
    }
}