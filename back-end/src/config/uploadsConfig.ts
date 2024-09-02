import multer, { StorageEngine } from "multer";
import path from "path";
// Ställ in lagringsplats och filnamn för uppladdade bilder

const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const originalName = path.basename(
      file.originalname,
      path.extname(file.originalname)
    );
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${originalName}-${timestamp}${ext}`); // Lägg till timestamp för att undvika dubbletter
  },
});
// Filtrera och validera filtyper

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed") as any, false);
  }
};
// Multer instans

const upload = multer({ storage, fileFilter });

export default upload;
