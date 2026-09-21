import { Organization } from "@/models/OrganizationModel";
import dbConnect from "@/config/dbConnect";
import { NextResponse, NextRequest } from "next/server";
import { getUserIdFromToken } from "@/helpers/getDataFromToken";
import { uploadOnCloudinary } from "@/config/cloudinary";
import { User } from "@/models/UserModel";


export async function POST(request : NextRequest) {
    try {
        await dbConnect() 
        const formData = await request.formData()
        const owner = await getUserIdFromToken(request)

        if(!owner) return NextResponse.json({error : "your are unauthorize login again"},{status : 409})

        const name = formData.get("name") as string
        const slug = formData.get("slug") as string
        const timezone = formData.get("timezone") as string
        const aiFeatureEnabled = formData.get("aiFeatureEnabled") as string
        const workingDays = formData.get("workingDays") as string
        const companyLogo = formData.get("logo") as File

        if([name, timezone, aiFeatureEnabled, workingDays].some(e => e.trim() === " ")) {
            return NextResponse.json({error : "required fields are not filled"},{status : 401})
        }

        if(!companyLogo){

            const organization = await Organization.create({
                name,
                slug : slug?.trim(),
                timezone,
                logo : "",
                aiFeatureEnabled,
                workingDays,
                owner
            })

            if(organization){
                await User.findByIdAndUpdate(owner,{
                    $set : {
                        organization : organization._id
                    }
                })
            }
            
            return NextResponse.json({
                message : "organization created successfully",
                success : true,
                organization
            }, {status : 200})
        }

        const logoUrl = await uploadOnCloudinary(companyLogo)

        const organization = await Organization.create({
            name,
            slug : slug?.trim(),
            timezone,
            logo : logoUrl?.secure_url || "",
            aiFeatureEnabled,
            workingDays,
            owner
        })

        if(organization){
            await User.findByIdAndUpdate(owner,{
                $set : {
                    organization : organization._id
                }
            })
        }
        
        return NextResponse.json({
            message : "organization created successfully",
            success : true,
            organization
        }, {status : 200})
    }


    catch (error) {
        //@ts-ignore
        return NextResponse.json({error : error.messsage ||  "something went wrong while creating Organization"},{status : 500})
    }
}