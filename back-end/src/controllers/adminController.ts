import { Request, Response } from "express";
import Admin from "../models/Admin";
import bcrypt from "bcrypt";

// Skapa en ny Admin
//

export const createAdmin = async (req: Request, res: Response) => {
  console.log("detta är data som kommer till backend", req);
  try {
    const { name, password, hospital, role } = req.body;
    console.log("Lösenordet", password);

    // Hasha lösenordet
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashat lösenord", hashedPassword);

    // Skapa en Admin
    const newAdmin = new Admin({
      name,
      password: hashedPassword,
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

// Hämta alla Admin

export const getAdmins = async (req: Request, res: Response) => {
  try {
    // Hämta hospital från req
    const hospital = req.query.hospital as string;

    // Skapa en querifråga för sökning med strängen hospital
    const query: any = {};
    if (hospital) {
      query.hospital = hospital;
      query.role = "Admin";
    }

    const admins = await Admin.find(query);
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ messsage: "Server error", error });
  }
};

// Uppdatera Admin

export const updateAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const admin = await Admin.findByIdAndUpdate(id, updates, { new: true });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Ta bort en Admin

export const deleteAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("ID from frontend:", id);
  console.log("Request params:", req.params);

  try {
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin Deleted" });
  } catch (error) {
    res.status(500).json({ meaage: "Something whent wrong deleting", error });
  }
};
