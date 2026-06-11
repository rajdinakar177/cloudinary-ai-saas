import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/app/dbConfig/db";
import Video from "@/app/models/videoModel";

export async function GET(request: NextRequest) {
  try {
    await connect();

    const videos = await Video.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: videos.length,
      videos,
    });
  } catch (error) {
    console.error("Get Videos Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}