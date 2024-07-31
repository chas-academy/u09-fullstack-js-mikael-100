import { Router } from "express";
import {
  getAllCuisines,
  getCuisineById,
  createCuisine,
  updateCuisine,
  deleteCuisine,
} from "../controllers/cuisineController";

const cuisineRouter = Router();

cuisineRouter.get("/", getAllCuisines);
cuisineRouter.get("/:id", getCuisineById);
cuisineRouter.post("/", createCuisine);
cuisineRouter.put("/:id", updateCuisine);
cuisineRouter.delete("/:id", deleteCuisine);

export default cuisineRouter;
