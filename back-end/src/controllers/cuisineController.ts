import { Request, Response } from "express";
import Cuisine from "../models/Cuisine";

// Hämtar alla Rätter
export const getAllCuisines = async (req: Request, res: Response) => {
  try {
    const cuisines = await Cuisine.find();
    res.json(cuisines);
  } catch (error) {
    console.error("Error fetching all cuisines:", error);
    res
      .status(500)
      .json({
        message: "Error fetching all cuisines",
        error: error instanceof Error ? error.message : "Unknown error",
      });
  }
};

// Hämta en specifik
export const getCuisineById = async (req: Request, res: Response) => {
  try {
    const cuisine = await Cuisine.findById(req.params.id);
    if (!cuisine) return res.status(404).json({ message: "Cuisine not found" });
    res.json(cuisine);
  } catch (error) {
    console.error("Error fetching cuisine by ID:", error);
    res
      .status(500)
      .json({
        message: "Error fetching cuisine by ID",
        error: error instanceof Error ? error.message : "Unknown error",
      });
  }
};

// Skapa en rätt
export const createCuisine = async (req: Request, res: Response) => {
  const {
    hospital,
    dish,
    information,
    allergies,
    image,
    price,
    options,
    quantity,
  } = req.body;

  // Validera inkommande data
  if (
    !hospital ||
    !dish ||
    !information ||
    !Array.isArray(allergies) ||
    typeof price !== "number" ||
    !options ||
    typeof quantity !== "number"
  ) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  const cuisine = new Cuisine({
    hospital,
    dish,
    information,
    allergies,
    image,
    price,
    options,
    quantity,
  });

  try {
    const newCuisine = await cuisine.save();
    res.status(201).json(newCuisine);
  } catch (error) {
    console.error("Error creating cuisine:", error);
    res
      .status(400)
      .json({
        message: "Error creating cuisine",
        error: error instanceof Error ? error.message : "Unknown error",
      });
  }
};

// Uppdatera rätt
export const updateCuisine = async (req: Request, res: Response) => {
  try {
    const updateCuisine = await Cuisine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateCuisine)
      return res.status(404).json({ message: "Cuisine not found" });
    res.json(updateCuisine);
  } catch (error) {
    console.error("Error updating cuisine:", error);
    res
      .status(400)
      .json({
        message: "Error updating cuisine",
        error: error instanceof Error ? error.message : "Unknown error",
      });
  }
};

// Ta bort en
export const deleteCuisine = async (req: Request, res: Response) => {
  try {
    const deleteCuisine = await Cuisine.findByIdAndDelete(req.params.id);
    if (!deleteCuisine)
      return res.status(404).json({ message: "Cuisine not found" });
    res.json({ message: "Cuisine Deleted" });
  } catch (error) {
    console.error("Error deleting cuisine:", error);
    res
      .status(500)
      .json({
        message: "Error deleting cuisine",
        error: error instanceof Error ? error.message : "Unknown error",
      });
  }
};
