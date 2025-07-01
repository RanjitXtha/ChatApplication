import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../lib/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'chat-app-users', 
 
    public_id: (req, file) => {
      return `profile_${Date.now()}`;
    },
  },
});

export const upload = multer({ storage });
