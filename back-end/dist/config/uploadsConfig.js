"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Ställ in lagringsplats och filnamn för uppladdade bilder
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const originalName = path_1.default.basename(file.originalname, path_1.default.extname(file.originalname));
        const timestamp = Date.now();
        const ext = path_1.default.extname(file.originalname);
        cb(null, `${originalName}-${timestamp}${ext}`); // Lägg till timestamp för att undvika dubbletter
    },
});
// Filtrera och validera filtyper
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    }
    else {
        cb(new Error("Only images are allowed"), false);
    }
};
// Multer instans
const upload = (0, multer_1.default)({ storage, fileFilter });
exports.default = upload;
