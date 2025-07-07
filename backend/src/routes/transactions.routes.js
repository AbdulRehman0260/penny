import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
  getMonthlyTransactions,
  getMonthlyIncomeTransactions,
} from "../controllers/transaction.controllers.js";

const router = express.Router();

router.post("/add-transaction", protectRoute, addTransaction);
router.get("/get-transactions", protectRoute, getTransactions);
router.get("/get-transactions/monthly", protectRoute, getMonthlyTransactions);
router.get(
  "/get-transactions/income-monthly",
  protectRoute,
  getMonthlyIncomeTransactions
);
router.delete("/delete-transaction/:id", protectRoute, deleteTransaction);
router.patch("/update-transaction/:id", protectRoute, updateTransaction);

export default router;
