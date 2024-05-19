import { v2 as cloudinary } from "cloudinary";

async function imageurl(image: Record<string, any>) {
  try {
    const result = await cloudinary.uploader.upload(image.tempFilePath);
    return result.url;
  } catch (error: any) {
    return "";
  }
}

export default imageurl;
