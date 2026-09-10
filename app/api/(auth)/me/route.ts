import { User } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { getUserIdFromToken } from "@/helpers/getDataFromToken";

export async function GET(request: NextRequest) {
    try {
        await dbConnect()

        const userId = await getUserIdFromToken(request)

        if (!userId) return NextResponse.json({ error: "you are unathorized please login again" }, { status: 409 })

        const user = await User.findById(userId).select('-refreshToken')

        return NextResponse.json(
            {
                message: "user fetched successfully",
                success: true,
                user
            },
            { status: 201 }
        )

    } catch (error) {
        return NextResponse.json({ error: "something went wrong while updating user" }, { status: 500 })
    }
}