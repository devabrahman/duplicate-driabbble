/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

export async function POST(request: Request) {
  const { path } = await request.json();

  if (!path) {
    return NextResponse.json(
      { message: 'Image path is required' },
      { status: 400 }
    );
  }

  try {
    const options = {
      use_fileName: true,
      unique_filename: false,
      folder: 'duplicate-dribbble-image',
      overwrite: true,
      transformation: [{ width: 1000, height: 727, crop: 'scale' }]
    };
    const result = await cloudinary.uploader.upload(path, options);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log('🔐 -> file: route.ts:17 -> POST -> error:', error);

    return NextResponse.json(
      { message: 'Can not uplod on cloudaniry server' },
      { status: 500 }
    );
  }
}
