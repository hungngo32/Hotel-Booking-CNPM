import express from "express";

import { createBill, getBill, getAllBill, deleteBill, countBill, earningMoney } from "../controllers/bill.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();
//ADdmin get all bill
router.get("/", verifyAdmin, getAllBill);
// router.get("/", getAllBill);
//Get Biill UserName
router.get("/:UserID", verifyUser, getBill)
//create Bill
router.post("/new", verifyUser, createBill)
router.delete("/delete/:id", verifyAdmin, deleteBill)

router.get("/countBill/me", countBill)
router.get("/earning/me", earningMoney)

export default router