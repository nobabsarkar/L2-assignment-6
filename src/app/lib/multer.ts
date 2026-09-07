import multer from "multer";

// set up multer for handling file uploads
const storage = multer.memoryStorage();

export const upload = multer({ storage: storage });
