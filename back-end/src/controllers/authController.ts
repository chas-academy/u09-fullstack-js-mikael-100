import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin";

const JWT_SECRET = process.env.JWT_SECRET as string;

// Kontrollera om JWT_SECRET är definierad
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

console.log("JWT_SECRET:", JWT_SECRET);

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { name, password, hospital, role } = req.body;

    console.log("Received data:", { name, password, hospital, role });

    // Hitta admin med angivet namn, sjukhus och roll
    const admin = await Admin.findOne({ name, hospital, role });
    console.log("Admin found:", admin); // Logg för att visa den hittade admin

    if (!admin) {
      return res
        .status(401)
        .json({ message: "Invalid credentials på fins user" });
    }

    // Kontrollera att lösenordet stämmer
    console.log("Given password:", password); // Logga skickat lösenord
    console.log("Hashed password from DB:", admin.password); // Logga hashat lösenord från databasen

    const passwordMatch = await bcrypt.compare(password, admin.password);
    console.log("Password match result:", passwordMatch); // Logga resultatet av lösenordsmatchningen

    // Om lösenordet inte matchar
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials: password mismatch" });
    }

    // Skapa JWT Token
    const token = jwt.sign(
      { id: admin._id, name: admin.name, role: admin.role },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Skicka token och admin-datan
    res.json({
      message: "Login Successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        hospital: admin.hospital,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
