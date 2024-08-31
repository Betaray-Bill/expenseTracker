import express from 'express';
import { addExpense, getAllRecords } from '../controllers/expenseController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/getAllExpense", protect, getAllRecords)
router.post("/addExpense", protect, addExpense)

export default router