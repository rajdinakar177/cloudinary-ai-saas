import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { connect } from "@/app/dbConfig/db";
import User from "@/app/models/userModel";
import Video from "@/app/models/videoModel";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  public_id: string;
  bytes: number;
  duration?: number;
  secure_url: string;
}

interface TokenData {
  id: string;
  email: string;
  username: string;
}

export async function POST(request: NextRequest) {
  try {
    await connect();

    // Get Token
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const secret = process.env.TOKEN_SECRET;

    if (!secret) {
      throw new Error("TOKEN_SECRET is not defined");
    }

    // Verify JWT
    const decoded = jwt.verify(token, secret) as TokenData;

    // Check User
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Get Form Data
    const formData = await request.formData();

    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Allow only videos
    if (!file.type.startsWith("video/")) {
      return NextResponse.json(
        { error: "Only video files are allowed" },
        { status: 400 }
      );
    }

    // Max 100MB
    const MAX_SIZE = 100 * 1024 * 1024;

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 100MB" },
        { status: 400 }
      );
    }

    // Convert File -> Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "video",
            folder: "saas-cloudinary",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else if (result) {
              resolve(result as CloudinaryUploadResult);
            } else {
              reject(new Error("Upload failed"));
            }
          }
        );

        stream.end(buffer);
      }
    );

    // Save to MongoDB
    const video = await Video.create({
      title: title || file.name,
      description: description || "No description provided",
      PublicId: uploadResult.public_id,
      originalSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      compressedSize: `${(uploadResult.bytes / (1024 * 1024)).toFixed(2)} MB`,
      duration: uploadResult.duration || 0,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Video uploaded successfully",
        video,
        cloudinaryUrl: uploadResult.secure_url,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Upload Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Upload failed",
      },
      { status: 500 }
    );
  }
}