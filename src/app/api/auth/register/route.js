import connectToDb from "@/database/index";
import { NextResponse } from "next/server";
import { hash } from 'bcryptjs';
import UserModel from "@/models/user";


export const dynamic = "force-dynamic";

export async function POST(req) {
    await connectToDb();


    const { name, email, password, uid } = await req.json();

    if (!name || !email || !password) {
        return NextResponse.json({
            success: false,
            message: "Please fill all required fields",
        });
    } else {
        try {
            const existingUser = await UserModel.findOne({ email });

            if (existingUser) {
                return NextResponse.json({
                    success: false,
                    message: "User already exists",
                });
            }

            const hashedPassword = await hash(password, 10);
            const newUser = await UserModel.create({
                uid,
                name,
                email,
                password: hashedPassword,
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