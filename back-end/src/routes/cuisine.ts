import { Router, Request, Response } from "express";

const cuisineRouter = Router();

// Hämtar alla rätter
cuisineRouter.get("/", getCuisines);

// Hämtar en rätt

cuisineRouter.get("/:id", getCuisineById);

// Lägg till Rätt

cuisineRouter.post("/", (req: Request, res: Response) => {
  const newCuisine = req.body;
  await newCuisine.save();
});

// Uppdatera rätt

cuisineRouter.put("/:id", updateCuisine);

// Ta bort rätt

cuisineRouter.delete("/:id", deleteCuisine);

export default cuisineRouter;
