import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  createdAt: Date;
  Hospital: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Department: string;
  Orders?: string[];
}

const OrderSchema: Schema<IOrder> = new Schema({
  createdAt: { type: Date, default: Date.now },
  Hospital: { type: String, required: true },
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  PhoneNumber: { type: String, required: true },
  Department: { type: String, required: true },
  Orders: { type: [String], required: true },
});

const Order = mongoose.model<IOrder>("Order", OrderSchema, "orders");

export default Order;
