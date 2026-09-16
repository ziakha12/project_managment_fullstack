import { Organization } from "@/models/OrganizationModel";
import { getUserIdFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/config/dbConnect";


export async function PUT(
    request : NextRequest,
    { params }: { params: Promise<{ id: string }>}
) {
    try {
        await dbConnect()

        const {id} = await params; 
        const {name, slug, timezone, currency, workingDays, aiFeatureEnabled, organizationStatus} = await request.json();

        if (!id) return NextResponse.json({error : 'id is required'}, {status : 401})

        const updatedDetails = await Organization.findByIdAndUpdate(
            id,
            {
                $set : {
                    name,
                    slug : slug?.trim().toLocaleLowerCase(),
                    timezone,
                    currency,
                    workingDays,
                    aiFeatureEnabled,
                    organizationStatus
                }
            },
            {
                new : true
            }
        )

        return NextResponse.json({
            message : "oraagnization details updated successfully",
            success : true,
            oraganization : updatedDetails
        })

    } catch (error) {
        // @ts-ignore
        return NextResponse.json({error : error.message || "something went wrong while updating Organization details" }, { status : 500})
    }
}