import { Router } from "express";
import { loginAdmin, logoutAdmin } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/login", loginAdmin);
authRouter.post("/logout", logoutAdmin);

export default authRouter;
