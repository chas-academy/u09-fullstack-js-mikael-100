import { Request, Response } from "express";
import Admin from "../models/Admin";

// Skapa en ny Admin

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password, hospital, role } = req.body;

    // Skapa en Admin
    const newAdmin = new Admin({
      username,
      password,
      hospital,
      role,
    });

    // Spara den nya Admin
    await newAdmin.save();
    res
      .status(201)
      .json({ message: "Admin created successfully", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error creating Admin", error });
  }
};
