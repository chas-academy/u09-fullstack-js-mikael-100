import { Request, Response } from "express";
import Order from "../models/Order";

// Hämta alla Order

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const order = await Order.find();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

// Hämta en specifik Order

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error as any });
  }
};

// Skapa en Order

export const createOrder = async (req: Request, res: Response) => {
  const { Hospital, FirstName, LastName, PhoneNumber, Department, Orders } =
    req.body;

  // Validera indata (kan justeras beroende på dina krav)
  if (
    !Hospital ||
    !FirstName ||
    !LastName ||
    !PhoneNumber ||
    !Department ||
    !Orders
  ) {
    return res.status(400).json({
      message: "All fields are required.",
    });
  }

  const order = new Order({
    Hospital,
    FirstName,
    LastName,
    PhoneNumber,
    Department,
    Orders,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json({
      message: "A new order has been created",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error); // Logga felet för debugging
    res.status(500).json({
      message: "Something went wrong, please try again",
      error: error instanceof Error ? error.message : "Unknown error", // Mer specifik felmeddelande
    });
  }
};

// Uppdatera Order

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updateOrder)
      return res.status(404).json({ message: "Order not found" });
    res.json(updateOrder);
  } catch (error) {
    res.json(404).json({ message: error as any });
  }
};

// Ta bort en Order

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deleteOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deleteOrder)
      return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order Deleted" });
  } catch (error) {
    res.status(500).json({ message: error as any });
  }
};
