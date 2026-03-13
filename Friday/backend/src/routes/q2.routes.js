import express from 'express';
import { filterStudents, getData } from '../controllers/q2.controllers.js';

const router = express.Router();

router.get("/data", getData);
router.get("/filter/:course", filterStudents);

export default router;