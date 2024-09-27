import { Router } from "express";
import { loginAdmin } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/", loginAdmin);

export default authRouter;
