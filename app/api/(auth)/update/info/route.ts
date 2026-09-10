import { User } from "@/models/UserModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { getUserIdFromToken } from "@/helpers/getDataFromToken";

export async function PUT(request: NextRequest) {
    try {
        await dbConnect()
        const formData = await request.formData()

        const userId = await getUserIdFromToken(request)

        if(!userId) return NextResponse.json({error : "you are unathorized please login again"},{status : 409})

        const username = formData.get("username") as string
        const password = formData.get("password") as string
        const email = formData.get("email") as string
        const role = formData.get("role") as string
        const department = formData.get("department") as string

        
        const newHashPassowrd = await bcrypt.hash(password, 12)
        const user = await User.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        username,
                        role,
                        department,
                        email,
                        password : newHashPassowrd
                    },
                },
                { new: true }
            );

            if(!user) return NextResponse.json({error : "something went wrong while updating user"},{status : 409})
        
            return NextResponse.json(
                {
                    message : "user Update successfully",
                    success : true,
                    user
                },
                {status : 201}
            )

    } catch (error) {
        return NextResponse.json({ error: "something went wrong while updating user" }, { status: 500 })
    }
}