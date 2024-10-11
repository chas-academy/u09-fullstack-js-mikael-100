"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAdminSuperAdmin = exports.authenticateSuperAdmin = exports.authenticateAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const authenticateAdmin = (req, res, next) => {
    const token = req.cookies.token; // Hämta token från cookien
    if (!token) {
        return res
            .status(401)
            .json({ message: "Access denied. No token provided." });
    }
    try {
        // Här tas token och den hemliga nyckeln (JWT_SECRET) tillsammans för att dekryptera och verifiera informationen som finns i JWT-tokenen
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Kontrollera om användaren är admin
        if (decoded.role !== "Admin") {
            return res
                .status(403)
                .json({ message: "Access denied. You do not have permission." });
        }
        // Sätt användarens ID i request-objektet
        req.user = {
            id: decoded.id,
            role: decoded.role,
            hospital: decoded.hospital,
        };
        next(); // Fortsätt till nästa middleware eller route handler
    }
    catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Invalid token." });
    }
};
exports.authenticateAdmin = authenticateAdmin;
const authenticateSuperAdmin = (req, res, next) => {
    const token = req.cookies.token; // Hämta token från cookien
    if (!token) {
        return res
            .status(401)
            .json({ message: "Access denied. No token provided." });
    }
    try {
        // Här tas token och den hemliga nyckeln (JWT_SECRET) tillsammans för att dekryptera och verifiera informationen som finns i JWT-tokenen
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Kontrollera om användaren är admin
        if (decoded.role !== "Super Admin") {
            return res
                .status(403)
                .json({ message: "Access denied. You do not have permission." });
        }
        // Sätt användarens ID i request-objektet
        req.user = {
            id: decoded.id,
            role: decoded.role,
            hospital: decoded.hospital,
        };
        next(); // Fortsätt till nästa middleware eller route handler
    }
    catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Invalid token." });
    }
};
exports.authenticateSuperAdmin = authenticateSuperAdmin;
const authenticateAdminSuperAdmin = (req, res, next) => {
    const token = req.cookies.token; // Hämta token från cookien
    if (!token) {
        return res
            .status(401)
            .json({ message: "Access denied. No token provided." });
    }
    try {
        // Här tas token och den hemliga nyckeln (JWT_SECRET) tillsammans för att dekryptera och verifiera informationen som finns i JWT-tokenen
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Kontrollera om användaren är admin
        if (decoded.role !== "Super Admin" && decoded.role !== "Admin") {
            return res
                .status(403)
                .json({ message: "Access denied. You do not have permission." });
        }
        // Sätt användarens ID i request-objektet
        req.user = {
            id: decoded.id,
            role: decoded.role,
            hospital: decoded.hospital,
        };
        next(); // Fortsätt till nästa middleware eller route handler
    }
    catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Invalid token." });
    }
};
exports.authenticateAdminSuperAdmin = authenticateAdminSuperAdmin;
