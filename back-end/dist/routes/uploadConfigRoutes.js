"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadsConfig_1 = __importDefault(require("../config/uploadsConfig"));
const uploadConfigRoutes = express_1.default.Router();
uploadConfigRoutes.post("/upload", uploadsConfig_1.default.single("file"), (req, res) => {
    if (!req.file) {
        // Om ingen fil laddades upp
        return res.status(400).send("Ingen fil laddades upp.");
    }
    res.send("Fil Uppladdad");
});
exports.default = uploadConfigRoutes;
