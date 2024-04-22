// Import necessary modules
import { auth } from "@clerk/nextjs";
import { connectToDatabase } from "../../../../lib/database"; // Import MongoDB connection function
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs";
import User from "../../../../lib/database/models/user.model";
import Crop from "../../../../lib/database/models/crop.model";

export async function POST(request) {
  try {
    const { userId } = auth();

    const user = await clerkClient.users.getUser(userId);
    const mongoId = user.publicMetadata.userId;
    console.log({ userId, mongoId });

    // const body = await request.body.text();
    const { crop, cropId, area, longitude, latitude, period, startDate } =
      await request.json();
    // JSON.parse(body);

    if (
      !latitude ||
      !longitude ||
      !crop ||
      !cropId ||
      !area ||
      !period ||
      !startDate
    ) {
      return NextResponse.json({
        status: 404,
        mssg: "Invalid parameters for add-crop",
      });
    }

    const db = await connectToDatabase();
    const mongoUser = await User.findById(mongoId);
    if (!mongoUser) {
      return NextResponse.json({ status: 401, mssg: "No user found" });
    }
    // console.log(mongoUser);

    const _crop = {
      userId: mongoId,
      cropId: cropId,
      crop: crop,
      startDate: new Date(startDate * 1000),
      lastUpdate: new Date(startDate * 1000),
      location: {
        latitude,
        longitude,
      },
      area: area,
      period: period,
      water: Array(period).fill(0),
    };
    const newCrop = await Crop.create(_crop);

    return NextResponse.json({ status: 200, mssg: "crop added successfully!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      mssg: "Failed to add-crop. server side error",
    });
  }
}

export async function GET(request) {
  try {
    const { userId } = auth();

    const user = await clerkClient.users.getUser(userId);
    const mongoId = user.publicMetadata.userId;
    console.log({ userId, mongoId });

    const db = await connectToDatabase();
    const mongoUser = await User.findById(mongoId);
    if (!mongoUser) {
      return NextResponse.json({ status: 401, mssg: "No user found" });
    }
    // console.log(mongoUser);

    const crops = await Crop.find({ userId: mongoId });

    return NextResponse.json({ status: 200, crops });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      mssg: "Failed to add-crop. server side error",
    });
  }
}
