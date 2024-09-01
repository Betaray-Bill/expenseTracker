import express from 'express';
import { addIncome, getAllRecords } from '../controllers/incomeController.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();

router.get("/getAllIncome/:id", protect, getAllRecords)
router.post("/addIncome", protect, addIncome)


export default router