"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import "dotenv" laddar in variablerna innan app laddas in detta gör dem tillgägliga för hela appen.
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
const port = process.env.PORT || 3000;
// Anslut till MongoDB och starta servern endast om anslutningen lyckas
const startServer = async () => {
    try {
        // Anslut till MongoDB
        await (0, db_1.default)();
        // Starta servern om anslutningen till databasen lyckas
        app_1.default.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error("Error during server startup:", error);
        process.exit(1);
    }
};
startServer();
