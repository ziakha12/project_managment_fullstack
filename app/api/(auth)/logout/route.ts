import { User } from "@/models/UserModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/config/dbConnect";
import { getUserIdFromToken } from "@/helpers/getDataFromToken";

export async function POST(request: NextRequest) {
    try {
        await dbConnect()

        const userId = await getUserIdFromToken(request)

        if(!userId) return NextResponse.json({error : "you are already logged out please refresh the page"},{status : 409})
        
        await User.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        refreshToken : null,
                    },
                },
                { new: true }
            );

            const response = NextResponse.json(
                {
                    message : "user logged out successfully",
                    success : true,
                },
                {status : 201}
            )

            response.cookies.delete("token")
        
            return response

    } catch (error) {
        return NextResponse.json({ error: "something went wrong while updating user" }, { status: 500 })
    }
}