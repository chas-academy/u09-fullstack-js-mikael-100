import { Request, Response } from "express";
import Cuisine from "../models/Cuisine";

// Hämtar alla Rätter

// export const getAllCuisines = async (req: Request, res: Response) => {
//   try {
//     const cuisines = await Cuisine.find();
//     res.json(cuisines);
//   } catch (error) {
//     res.status(500).json({ message: (error as any).message });
//   }
// };

export const getAllCuisines = async (req: Request, res: Response) => {
  console.log("Received request to get all cuisines"); // Logga inkommande förfrågan

  try {
    const cuisines = await Cuisine.find();

    // Logga resultatet eller statusen av sökningen
    console.log(`Found ${cuisines.length} cuisines`);

    res.json(cuisines);
  } catch (error) {
    console.error("Error fetching cuisines:", error); // Logga fel
    res.status(500).json({ message: (error as any).message });
  }
};

// Hämta en specifik

export const getCuisineById = async (req: Request, res: Response) => {
  try {
    const cuisine = await Cuisine.findById(req.params.id);
    if (!cuisine) return res.status(404).json({ message: "Cuisine not found" });
    res.json(cuisine);
  } catch (error) {
    res.status(500).json({ message: error as any });
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
    res.status(400).json({ message: error as any });
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
    res.status(400).json({ message: error as any });
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
    res.status(500).json({ message: error as any });
  }
};
