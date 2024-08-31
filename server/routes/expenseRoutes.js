import express from 'express';
import { addExpense, getAllRecords } from '../controllers/expenseController.js';


const router = express.Router();

router.get("/getAllExpense", getAllRecords)
router.post("/addExpense", addExpense)


export default router