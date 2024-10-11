"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdmin = exports.updateAdmin = exports.getAdmins = exports.createAdmin = void 0;
const Admin_1 = __importDefault(require("../models/Admin"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Skapa en ny Admin
//
const createAdmin = async (req, res) => {
    console.log("detta är data som kommer till backend", req);
    try {
        const { name, password, hospital, role } = req.body;
        console.log("Lösenordet", password);
        // Hasha lösenordet
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        console.log("hashat lösenord", hashedPassword);
        // Skapa en Admin
        const newAdmin = new Admin_1.default({
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
    }
    catch (error) {
        res.status(500).json({ message: "Error creating Admin", error });
    }
};
exports.createAdmin = createAdmin;
// Hämta alla Admin
const getAdmins = async (req, res) => {
    try {
        // Hämta hospital från req
        const hospital = req.query.hospital;
        // Skapa en querifråga för sökning med strängen hospital
        const query = {};
        if (hospital) {
            query.hospital = hospital;
            query.role = "Admin";
        }
        const admins = await Admin_1.default.find(query);
        res.status(200).json(admins);
    }
    catch (error) {
        res.status(500).json({ messsage: "Server error", error });
    }
};
exports.getAdmins = getAdmins;
// Uppdatera Admin
const updateAdmin = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const admin = await Admin_1.default.findByIdAndUpdate(id, updates, { new: true });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json(admin);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
exports.updateAdmin = updateAdmin;
// Ta bort en Admin
const deleteAdmin = async (req, res) => {
    const { id } = req.params;
    console.log("ID from frontend:", id);
    console.log("Request params:", req.params);
    try {
        const admin = await Admin_1.default.findByIdAndDelete(id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ message: "Admin Deleted" });
    }
    catch (error) {
        res.status(500).json({ meaage: "Something whent wrong deleting", error });
    }
};
exports.deleteAdmin = deleteAdmin;
