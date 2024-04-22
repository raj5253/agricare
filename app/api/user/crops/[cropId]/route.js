"use server";
import { auth } from "@clerk/nextjs";
import { connectToDatabase } from "../../../../../lib/database"; // Import MongoDB connection function
import { NextResponse } from "next/server";
// import { clerkClient } from "@clerk/nextjs";
// import User from "../../../../../lib/database/models/user.model";
import Crop from "../../../../../lib/database/models/crop.model";

export async function GET(request, { params }) {
  try {
    const cropId = params.cropId;
    console.log({ cropId });
    // const { userId } = auth();

    // const user = await clerkClient.users.getUser(userId);
    // const mongoId = user.publicMetadata.userId;
    // console.log({ userId, mongoId });

    const db = await connectToDatabase();
    // const mongoUser = await User.findById(mongoId);
    // if (!mongoUser) {
    //   return NextResponse.json({ status: 401, mssg: "No user found" });
    // }
    // console.log(mongoUser);

    const crop = await Crop.findById(cropId);

    if (crop) {
      return NextResponse.json({ status: 200, crop });
    }
    return NextResponse.json({
      status: 404,
      mssg: "No such crop by user exists",
    });
  } catch (error) {
    console.log(error?.message);
    return NextResponse.json({
      status: 500,
      mssg: "Failed to add-crop. server side error",
    });
  }
}

export async function POST(request, { params }) {
  try {
    const cropId = params.cropId;
    const data = await request.json();
    console.log(data);
    await connectToDatabase();
    const crop = await Crop.findByIdAndUpdate(cropId, { $set: data });
    return NextResponse.json({ status: 200, crop });
  } catch (error) {
    console.log(error?.message);
    return NextResponse.json({
      status: 500,
      mssg: "Failed to add-crop. server side error",
    });
  }
}
