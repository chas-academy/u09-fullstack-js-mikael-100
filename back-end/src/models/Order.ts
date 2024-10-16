import mongoose, { Document, Schema } from "mongoose";

// Definiera ett gränssnitt för orderdetaljer

export interface IOrder extends Document {
  createdAt: Date;
  Hospital: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Mail: string;
  Department: string;
  Orders: { dish: string; amount: number }[];
  Status: string;
  TotalSum: string;
  OrderApprovedBy: string;
}

// // Skapa ett schema för orderdetaljern

const OrderSchema: Schema<IOrder> = new Schema({
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
  OrderApprovedBy: { type: String },
});

const Order = mongoose.model<IOrder>("Order", OrderSchema, "orders");

export default Order;
