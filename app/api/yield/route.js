import axios from "axios";
import { NextResponse } from "next/server";
export async function POST(request) {
  try {
    const data = await request.json();
    const res = await axios.post(
        "http://127.0.0.1:5000/api/crop_yield",
      data
    );
  
    return NextResponse.json(res.data);
  } catch (error) {
    // console.log(error);
    return NextResponse.json({
      status: 500,
      msg: "Failed to get  data",
    });
  }
}