import express from 'express';
import { addIncome, getAllRecords } from '../controllers/incomeController.js';
const router = express.Router();

router.get("/getAllIncome", getAllRecords)
router.post("/addIncome", addIncome)


export default router