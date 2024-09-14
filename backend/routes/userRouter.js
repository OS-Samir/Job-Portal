import express from "express";
import {register, updatedPassword, updateProfile} from "../controllers/userController.js";
import { login } from "../controllers/userController.js";
import { logout } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";
import { getUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getUser);
router.put("/update/profile", isAuthenticated, updateProfile)
router.put("/update/password", isAuthenticated, updatedPassword)


export default router;

