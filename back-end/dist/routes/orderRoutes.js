"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const authMiddleware_1 = require("../middleweare/authMiddleware");
const orderRouter = (0, express_1.Router)();
orderRouter.get("/", orderController_1.getAllOrders);
orderRouter.get("/:id", orderController_1.getOrderById);
orderRouter.post("/", orderController_1.createOrder);
// orderRouter.put("/:id", updateOrder);
// orderRouter.delete("/:id", deleteOrder);
// Fråga Ollie vad problemet är med denna till dess är de bortagna från uploadConfigRoutes, jag har problem med http cookie
orderRouter.put("/:id", authMiddleware_1.authenticateAdminSuperAdmin, orderController_1.updateOrder);
orderRouter.delete("/:id", authMiddleware_1.authenticateAdminSuperAdmin, orderController_1.deleteOrder);
exports.default = orderRouter;
