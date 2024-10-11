"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const cuisineController_1 = require("../controllers/cuisineController");
const path_1 = __importDefault(require("path"));
// Detta är uppsättnings för multer att spara filen i backend och ge den en väg samt tillåta endpointen att kunna ta emot File.
const destination = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        console.log(file.mimetype);
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({ storage: destination });
const cuisineRouter = (0, express_1.Router)();
cuisineRouter.get("/", cuisineController_1.getAllCuisines);
cuisineRouter.get("/:id", cuisineController_1.getCuisineById);
cuisineRouter.post("/", upload.single("image"), cuisineController_1.createCuisine);
cuisineRouter.put("/:id", upload.single("image"), cuisineController_1.updateCuisine);
cuisineRouter.delete("/:id", cuisineController_1.deleteCuisine);
exports.default = cuisineRouter;
