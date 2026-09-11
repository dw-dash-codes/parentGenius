import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
 
    let resource_type = 'auto';
    if (file.mimetype.includes('video')) {
      resource_type = 'video';
    }
    return {
      folder: 'parentgenius_courses',
      resource_type: resource_type,
      allowed_formats: ['jpg', 'jpeg', 'png', 'mp4', 'mov', 'avi'],
    };
  },
});

export const upload = multer({ storage });