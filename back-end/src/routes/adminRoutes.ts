import { Router } from "express";
import {
  createAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
} from "../controllers/adminController";

const adminRouter = Router();

adminRouter.post("/", createAdmin);
adminRouter.get("/", getAdmins);
adminRouter.put("/:id", updateAdmin);
adminRouter.post("/:id", deleteAdmin);

export default adminRouter;
