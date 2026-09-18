import { Organization } from "@/models/OrganizationModel";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/config/dbConnect";

export async function PUT(
    request : NextRequest,
    { params }: { params: Promise<{ id: string }>}
) {
    try {
        await dbConnect()
        const id = (await params).id;
        const {name, slug, timezone, currency, workingDays, aiFeatureEnabled, organizationStatus } = await request.json();

        if (!id) return NextResponse.json({error : 'id is required'}, {status : 401})

        const updatedDetails = await Organization.findByIdAndUpdate(
            id,
            {
                $set : {
                    name,
                    slug : slug?.trim().toLocaleLowerCase(),
                    setting : {
                        timezone,
                        currency,
                        workingDays,
                        aiFeatureEnabled,
                    },
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

export async function DElETE({ params }: { params: Promise<{ id: string }>}) {
    try {
        await dbConnect()
        const {id} = await params;
        
        await Organization.findByIdAndDelete(id)

        return NextResponse.json({
            message : "organization deleted successfully",
            successs : true
        },{status : 200})

    } catch (error) {
        // @ts-ignore
        return NextResponse.json({error : error.message || "something went wrong while deleting Organization"},{status : 500})
    }
}

export async function GET({ params }: { params: Promise<{ id: string }>}) {
    try {
        const {id} = await params;

        const organization = await Organization.findById(id)

        return NextResponse.json({
            message : "organization fetched successfully",
            successs : true,
            organization
        },{status : 200})

    } catch (error) {
        // @ts-ignore
        return NextResponse.json({error : error.message || "something went wrong while getting the Organization"},{status : 500})
    }
}
