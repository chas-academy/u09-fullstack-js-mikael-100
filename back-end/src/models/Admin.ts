import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";

interface IAdmin extends Document {
  name: string;
  password: string;
  hospital: string;
  role: "SuperAdmin" | "Admin";
}

const adminSchema = new Schema<IAdmin>({
  name: { type: String, require: true },
  password: { type: String, require: true, unique: true },
  hospital: {
    type: String,
    require: true,
    enum: [
      "Alingsås lasarett",
      "Angereds Närsjukhus",
      "Frölunda specialistsjukhus",
      "Kungälvs sjukhus",
      "Skaraborgs Sjukhus",
      "Södra Älvsborgs Sjukhus",
    ],
  },
  role: { type: String, enum: ["Super Admin", "Admin"] },
});

// Skapa modellen
const Admin = mongoose.model<IAdmin>("admin", adminSchema);

export default Admin;
