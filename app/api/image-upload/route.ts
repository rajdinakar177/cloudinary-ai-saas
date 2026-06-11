import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import jwt from "jsonwebtoken";

import { connect } from "@/app/dbConfig/db";
import User from "@/app/models/userModel";

// Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, // Add your Cloudinary cloud name here
    api_key: process.env.CLOUDINARY_API_KEY, // Add your Cloudinary API key here
    api_secret: process.env.CLOUDINARY_API_SECRET // Add your Cloudinary API secret here
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
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json(
                { error: "File not found" },
                { status: 400 }
            );
        }
        if (!file.type.startsWith("image/")) {
            return NextResponse.json(
                { error: "Only image files are allowed" },
                { status: 400 }
            );
        }
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "image",
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
        });

        return NextResponse.json(
            {
                success: true,
                publicId: result.public_id,
                imageUrl: result.secure_url,
                size: result.bytes,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Upload Error:", error);

        return NextResponse.json(
            { error: "Upload failed" },
            { status: 500 }
        );
    }
}

