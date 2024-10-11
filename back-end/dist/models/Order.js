"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Skapa ett schema för orderdetaljer
const OrderDetailSchema = new mongoose_1.Schema({
    dish: { type: String, required: true },
    amount: { type: Number, required: true, min: 1 }, // Antal ska vara ett positivt tal
});
const OrderSchema = new mongoose_1.Schema({
    createdAt: { type: Date, default: Date.now },
    Hospital: { type: String, required: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    PhoneNumber: { type: String, required: true },
    Mail: { type: String, required: true },
    Department: { type: String, required: true },
    Orders: [
        {
            dish: { type: String, required: true },
            amount: { type: Number, required: true, min: 1 },
        },
    ],
    Status: { type: String, default: "pending" },
    TotalSum: { type: String },
});
const Order = mongoose_1.default.model("Order", OrderSchema, "orders");
exports.default = Order;
