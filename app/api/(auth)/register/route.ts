import { User } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect  from "@/utils/dbConnect";
import { uploadOnCloudinary } from "@/utils/cloudinary";

export async function POST(request: NextRequest) {
    try {

        await dbConnect();
        const formData = await request.formData()
        
        const username = formData.get("username") as string
        const password = formData.get("password") as string
        const email = formData.get("email") as string
        const role = formData.get("role") as string
        const organizationId = formData.get("organizationId") as string
        const department = formData.get("department") as string
        const image = formData.get("avatar") as File

        if(!username || !email || !password) return NextResponse.json({ error : "all feilds are required"},{status : 401})

        const existedUser = await User.findOne({$or : [{email}, {username}]})
        
        if(existedUser) return NextResponse.json({error : "user with same name or email already exist"},{status : 402})
        
        if(!image) return NextResponse.json({error : "image is required"}, {status :  401})

        const hashPassword =  await bcrypt.hash(password, 12)

        if(!hashPassword) return NextResponse.json({error : "something went wrong while encypting password"}, {status : 401})

        const imageUrl = await uploadOnCloudinary(image)

        const user = await User.create({
            username : username.toLocaleLowerCase().trim(),
            email : email,
            password : hashPassword,
            role : role,
            department : department,
            organization : organizationId,
            avatar : imageUrl?.secure_url || `https://api.dicebear.com/10.x/voxel-art/svg?seed=${username}`
        })

        return NextResponse.json({
            success : true,
            message : "User register Successfully"
        },{ status : 201})
    }

    catch(error){
        return NextResponse.json({error : error || "something went wrong while creating user"}, {status : 500})
    }
}