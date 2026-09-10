import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/UserModel";
import JWT from "jsonwebtoken";
import dbConnect from "@/utils/dbConnect";
import bcrypt from "bcryptjs";



export async function POST(request : NextRequest) {
    try {

        await dbConnect();

        const {username, email, password} = await request.json()

        if([username, email, password].some(e => e?.trim() === " ")) return NextResponse.json({error : "all fields are required"}, {status : 401})
         
        const userExist = await User.findOne({$or : [{email}, {username}]})

        if(!userExist) return NextResponse.json({error : "user not found"}, {status : 404})
                
        const isPasswordVerify = await bcrypt.compare(password, userExist.password)

        if(!isPasswordVerify) return NextResponse.json({error : "password is invalid"}, {status : 403})
    
        const userData = {
            id : userExist._id,
            email : userExist.email,
        }

        const token =  JWT.sign(userData, process.env.JWT_SECRET_TOKEN!, {expiresIn : '5d'})

        const response =  NextResponse.json({
            message :  `${username || email} logged in successfully`,
            success : true
        },{status : 201})

        response.cookies.set('token', token, { httpOnly : true})

        return response
        
    } catch (error) {
        return NextResponse.json({
            // @ts-ignore
            error : error?.message || "something went wrong while logging the user"
        },
    {
        status : 500
    })
    }
}