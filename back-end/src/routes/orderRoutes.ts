import { Router } from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController";
import { authenticateAdminSuperAdmin } from "../middleweare/authMiddleware";

const orderRouter = Router();

orderRouter.get("/", getAllOrders);
orderRouter.get("/:id", getOrderById);
orderRouter.post("/", createOrder);
orderRouter.put("/:id", authenticateAdminSuperAdmin, updateOrder);
orderRouter.delete("/:id", authenticateAdminSuperAdmin, deleteOrder);

export default orderRouter;
