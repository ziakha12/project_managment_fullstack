import { User } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/config/dbConnect";
import { getUserIdFromToken } from "@/helpers/getDataFromToken";
import { uploadOnCloudinary } from "@/config/cloudinary";

export async function PUT(request: NextRequest) {
    try {
        await dbConnect()
        const formData = await request.formData()

        const userId = await getUserIdFromToken(request)

        if(!userId) return NextResponse.json({error : "you are unathorized please login again"},{status : 409})

        const image = formData.get("avatar") as File

        const imageUrl = await uploadOnCloudinary(image)
     
        const user = await User.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        avatar : imageUrl.secure_url
                    },
                },
                { new: true }
            );

            if(!user) return NextResponse.json({error : "something went wrong while updating avatar"},{status : 402})
        
            return NextResponse.json(
                {
                    message : "user avatar ppdate successfully",
                    success : true,
                    avatar : user?.avatar
                },
                {status : 201}
            )

    } catch (error) {
        return NextResponse.json({ error: "something went wrong while updating user" }, { status: 500 })
    }
}