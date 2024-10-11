"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MongoDbConnect = process.env.MONGODBCONNECT;
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MongoDbConnect);
        console.log("Ansluten till Mongoose Fungerar Fint");
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Problem Med Anslutning Till Monggose", error.message);
        }
        else {
            console.error("Unexpected error med connection till MongoDB", error);
        }
        // Avslutar process vid fel
        process.exit(1);
    }
};
exports.default = connectDB;
