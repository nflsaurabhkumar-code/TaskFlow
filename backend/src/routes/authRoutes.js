import { Router } from "express";
import { register } from "../controllers/auth/registerController.js";
import { login } from "../controllers/auth/loginController.js";
import { logout, getMe } from "../controllers/auth/sessionController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", requireAuth, getMe);
export default router;
