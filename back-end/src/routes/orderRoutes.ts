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
// orderRouter.put("/:id", updateOrder);
// orderRouter.delete("/:id", deleteOrder);

// Fråga Ollie vad problemet är med denna till dess är de bortagna från uploadConfigRoutes, jag har problem med http cookie

orderRouter.put("/:id", authenticateAdminSuperAdmin, updateOrder);
orderRouter.delete("/:id", authenticateAdminSuperAdmin, deleteOrder);

export default orderRouter;
