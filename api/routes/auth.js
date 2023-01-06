import express from "express";
import { login, register } from "../controllers/auth.js";
import { updatePass } from "../controllers/auth.js";
const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/updatepass", updatePass)
export default router       