import { Request, Response } from "express";
import Cuisine from "../models/Cuisine";
import { request } from "http";

// Hämtar alla Rätter

export const getAllCuisines = async (req: Request, res: Response) => {
  try {
    const cuisines = await Cuisine.find();

    res.json(cuisines);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

// Hämta en specifik
//

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
  // Logga mottagna data för felsökning
  console.log("Request body:", req.body);
  console.log("Request File", req.file);

  // Konvertera price och quantity till nummer
  // const {
  //   hospital,
  //   dish,
  //   information,
  //   allergies,
  //   image,
  //   price,
  //   options,
  //   quantity,
  // } = req.body;

  const hospital = req.body.Sjukhus;
  const dish = req.body.Rubrik;
  const information = req.body.Info;
  const allergies = [
    req.body.Glutenfri,
    req.body.Laktosfri,
    req.body.Fläskfri,
    req.body.Vegetarisk,
    req.body.Mjölkproteinfri,
    req.body.Vegan,
  ];
  const price = req.body.Pris;
  const options = req.body.Alternativ;
  const quantity = req.body.Antal;

  const cuisine = new Cuisine({
    hospital,
    dish,
    information,
    allergies,
    image: req.file?.path,
    price,
    options,
    quantity,
  });

  try {
    const newCuisine = await cuisine.save();
    res.status(201).json({
      message: "A new cuisine has been created",
      cuisine: newCuisine,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong when trying to create a new cuisine",
      cuisine: error as any,
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
