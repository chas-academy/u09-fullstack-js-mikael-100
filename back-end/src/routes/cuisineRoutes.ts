import { Router } from "express";
import multer from "multer";
import {
  getAllCuisines,
  getCuisineById,
  createCuisine,
  updateCuisine,
  deleteCuisine,
} from "../controllers/cuisineController";
import path from "path";
const destination = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    console.log(file.mimetype);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: destination });
const cuisineRouter = Router();

cuisineRouter.get("/", getAllCuisines);
cuisineRouter.get("/:id", getCuisineById);
cuisineRouter.post("/", upload.single("image"), createCuisine);
cuisineRouter.put("/:id", updateCuisine);
cuisineRouter.delete("/:id", deleteCuisine);

export default cuisineRouter;
